import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_EXIST,
  USER_NOT_AUTHORIZED,
} from '@/common/constants'
import { currencyByCountry } from '@/common/helpers/currencyByCountry'
import { ResponseService } from '@/common/service/response'
import { E_RegistrationType, Z_UserRegister } from '@repo/contract'
import { EncryptionService } from '@repo/services'
import dayjs from 'dayjs'
import { Request, Response } from 'express'
import { capitalize } from 'lodash'
import redisClient from '@/common/utils/redisClient'
import { APP_NAME, CSRF, SESSION } from '@repo/constants'
import {
  googleAuthPrompt,
  googleAuthScope,
  googleOAuth2Client,
} from '../../users/helpers/googleAuth'
import { getGoogleUserData } from '../../users/helpers/googleApiRequest'
import generateSession from '../../users/helpers/generateSession'
import { T_User } from '@repo/contract'
import randomNumber from '@/common/helpers/randomNumber'
import { WEB_URL } from '@/common/constants/ev'
import { AuthEmail, TSendEmailParams } from '../../users/service/authEmail'
import verifyCaptcha from '@/common/helpers/verifyCaptcha'
import {
  dbForgotPasswords,
  dbGuests,
  dbMultiFactorAuths,
  dbUsers,
} from '@repo/database'
const passwordEncryption = new EncryptionService('password')

const response = new ResponseService()
const decryptionService = new EncryptionService('password')
const encryptionService = new EncryptionService('password')

export const register = async (req: Request, res: Response) => {
  const isInputValid = Z_UserRegister.safeParse(req.body)
  if (isInputValid.success) {
    const {
      email,
      password,
      firstName,
      lastName,
      birthDate,
      registrationType,
      country,
      canReceiveEmail,
      gender,
    } = req.body

    const currency: string =
      currencyByCountry[country as keyof typeof currencyByCountry]
    const selectedCurrency = currency ?? 'USD'
    try {
      const user = await dbUsers
        .findOne({ email: email as string })
        .populate('guest')
      const encryptedPassword = passwordEncryption.encrypt(password)
      if (!user) {
        const newGuest = new dbGuests({
          firstName: firstName,
          middleName: '',
          lastName: lastName,
          birthDate: dayjs(birthDate).format(),
          cellPhone: '',
          phone: '',
          gender: gender,
          country: country,
          language: 'English',
          currency: selectedCurrency,
          confirm: JSON.stringify({
            identity: false,
            email: false,
            phone: false,
          }),
        })
        await newGuest.save()
        const newUser = new dbUsers({
          email: email,
          registrationType: registrationType,
          role: 'User',
          password: encryptedPassword,
          canReceiveEmail,
          changePasswordAt: null,
          guest: newGuest._id,
          deletedAt: null,
          deactivated: false,
        })
        await newUser.save()

        await generateSession(req, res, newUser as T_User)
        res.json(
          response.success({
            action: {
              type: 'REGISTER_LOGIN_SUCCESS',
              link: '/', // Home
            },
            message: 'User registered and logged in!',
          })
        )
      } else {
        res.json(response.error({ message: 'Email already exist' }))
      }
    } catch (err: any) {
      res.json(response.error({ message: err.message }))
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const manual = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email && password) {
    try {
      const user = await dbUsers.findOne({
        email: email,
        registrationType: E_RegistrationType.Manual,
      })
      if (!user) {
        throw new Error('Email or password is invalid')
      }
      const decryptedPassword = passwordEncryption.decrypt(
        user?.password as string
      )
      const originalPassword = decryptedPassword.toString()
      const decryptInputPassword = passwordEncryption.decrypt(password)
      if (user && originalPassword === decryptInputPassword) {
        await generateSession(req, res, user as T_User)
        res.json(
          response.success({
            action: {
              type: 'MANUAL_LOGIN_SUCCESS',
              link: '/', // Home
            },
            message: 'User logged in!',
          })
        )
      } else {
        res.json(response.error({ message: 'Email or password is invalid' }))
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
}

export const info = async (req: Request, res: Response) => {
  res.json(response.success({ item: res.locals.user }))
}

export const verifySession = async (req: Request, res: Response) => {
  res.json(response.success({ item: res.locals.user }))
}

export const google = async (req: Request, res: Response) => {
  const redirectTo = req.body.redirectTo
  try {
    const authorizeUrl = googleOAuth2Client.generateAuthUrl({
      scope: googleAuthScope,
      prompt: googleAuthPrompt,
      state: redirectTo ? `redirect_to=${redirectTo}` : '',
    })
    res.json(
      response.success({
        action: {
          type: 'SOCIAL_LOGIN',
          link: authorizeUrl,
        },
      })
    )
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const googleRedirect = async (req: Request, res: Response) => {
  const code = req.query.code
  const state = req.query.state
  const redirectTo =
    state && typeof state === 'string' ? state.replace('redirect_to=', '') : ''
  if (code) {
    try {
      const googleCredentials = await googleOAuth2Client.getToken(
        code as string
      )
      googleOAuth2Client.setCredentials(googleCredentials.tokens)
      const credentials = googleOAuth2Client.credentials
      const googleUserData = await getGoogleUserData(
        credentials.access_token as string
      )
      const user = await dbUsers.findOne({ email: googleUserData.item?.email })
      if (user) {
        await generateSession(req, res, user as T_User)
        res.json(
          response.success({
            action: {
              type: 'SOCIAL_LOGIN_SUCCESS',
              link: redirectTo ? redirectTo : '/',
            },
            message: 'User logged in!',
          })
        )
      } else {
        res.json(
          response.success({
            action: {
              type: 'SOCIAL_REGISTER',
              link: '/create-account/google',
            },
            item: googleUserData.item,
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
}

export const verifySignIn = async (req: Request, res: Response) => {
  const { type, email } = req.query
  if (type && email) {
    try {
      const user = await dbUsers
        .findOne({ email: email as string })
        .populate('guests')
      const capitalizeType = capitalize(type as string)
      const isSocial =
        capitalizeType === E_RegistrationType.Facebook ||
        capitalizeType === E_RegistrationType.Google
      if (
        (user &&
          user.registrationType !== E_RegistrationType.Manual &&
          isSocial) ||
        (user &&
          user.registrationType === E_RegistrationType.Manual &&
          !isSocial)
      ) {
        res.json(
          response.success({
            item: { email },
          })
        )
      } else if (
        user &&
        user.registrationType !== E_RegistrationType.Manual &&
        !isSocial
      ) {
        res.json(
          response.error({
            item: null,
            message: `Invalid login method, please login using your ${type} account!`,
          })
        )
      } else if (
        user &&
        user.registrationType === E_RegistrationType.Manual &&
        isSocial
      ) {
        res.json(
          response.error({
            message: 'Invalid login method, please login using your password',
          })
        )
      } else if ((!user && type === 'google') || type === 'facebook') {
        res.json(
          response.success({
            action: {
              type: 'SOCIAL_REGISTER',
              description: type,
            },
            message: 'Email is not registered!',
          })
        )
      } else {
        res.json(
          response.success({
            message: 'Email is not registered!',
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
}

export const logout = async (req: Request, res: Response) => {
  const sessionCookie = req.cookies[SESSION]
  const csrfCookie = req.cookies[CSRF]

  if (sessionCookie && csrfCookie) {
    try {
      const session = await redisClient.hGetAll(
        `${sessionCookie}:${csrfCookie}`
      )
      if (session) {
        await redisClient.del(`${sessionCookie}:${csrfCookie}`)
      }
      res.clearCookie(SESSION)
      res.clearCookie(CSRF)
      res.json(
        response.success({
          action: {
            type: 'LOGOUT_SUCCESS',
            link: '/', // Home
          },
          message: 'User registered and logged out!',
        })
      )
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(
      response.success({
        message: 'Success logout!',
      })
    )
  }
}

export const forgotVerify = async (req: Request, res: Response) => {
  const { email, code, newPassword } = req.body
  if (email && code && newPassword) {
    try {
      const userForgotVerify = await dbUsers.findOne({
        email: email,
      })
      if (!userForgotVerify) {
        throw new Error('Some of the values are invalid')
      }
      const userforgotPassword = await dbForgotPasswords.findOne({
        email: email,
        code: String(code),
        used: false,
        expiredAt: {
          gte: Date.now(),
        },
      })
      if (userforgotPassword) {
        await dbForgotPasswords.findByIdAndUpdate(
          userforgotPassword._id,
          {
            $set: {
              used: true,
            },
          },
          { new: true }
        )

        const decryptNewPassword = decryptionService.decrypt(newPassword)
        const encryptPassword = encryptionService.encrypt(decryptNewPassword)
        await dbUsers
          .findOneAndUpdate({
            email: email,
            data: {
              password: String(encryptPassword),
            },
          })
          .populate('guests')
        res.json(response.success({ message: 'Password successfully updated' }))
      } else {
        res.json(
          response.error({
            message:
              'Some values are invalid or forgot password token is expired',
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const forgot = async (req: Request, res: Response) => {
  const { token, email } = req.body
  console.log('hello')
  if (email && token) {
    try {
      const isCaptchaTokenValid = await verifyCaptcha(token)
      if (!isCaptchaTokenValid) {
        throw new Error('CAPTCHA is invalid')
      }
      const user = await dbUsers.findOne({
        email: email,
      })
      if (!user) {
        throw new Error('This email does not exist in our records')
      }
      if (user.registrationType !== 'Manual') {
        throw new Error(
          `Account registration type is invalid, please login using your ${user.registrationType} account.`
        )
      }

      const userForgotPassword = await dbForgotPasswords.findOne({
        email: email,
        used: false,
        expiredAt: {
          gte: new Date(),
        },
      })

      const code = Math.floor(100000 + randomNumber() * 900000)
      const successMessage = `Email was sent to ${email}, please check before it expires.`
      const webVerifyUrl = `${WEB_URL}/new-password?email=${email}&code=${code}`
      const sendEmailParams = { to: email, magicLink: webVerifyUrl }
      const authEmail = new AuthEmail()
      if (!userForgotPassword) {
        authEmail.sendForgotPasswordEmail(sendEmailParams)
        const newForgotPassword = new dbForgotPasswords({
          email: email,
          code: String(code),
          expiredAt: Date.now(),
        })
        await newForgotPassword.save()
        res.json(response.success({ message: successMessage }))
      } else {
        authEmail.sendForgotPasswordEmail(sendEmailParams)
        res.json(response.success({ message: successMessage }))
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const updateUserEmail = async (req: Request, res: Response) => {
  const { email } = req.body
  const userId = req.params.userId
  try {
    const getUser = await dbUsers
      .findOne({ _id: userId, deletedAt: null })
      .populate('guest')
    if (getUser) {
      if (email) {
        if (String(email).indexOf('@') > 1) {
          const updateEmail = await dbUsers.findByIdAndUpdate(
            userId,
            { email: email },
            { deletedAt: null }
          )

          res.json(
            response.success({
              item: {
                user: updateEmail,
              },
              message: 'Successfully updated',
            })
          )
        } else {
          res.json(response.error({ message: 'Invalid email address' }))
        }
      } else {
        res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
      }
    } else {
      res.json(response.error({ message: USER_NOT_EXIST }))
    }
  } catch (err: any) {
    res.json(
      response.error({
        message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
      })
    )
  }
}

export const mfa = async (req: Request, res: Response) => {
  const { userId } = req.body
  if (userId) {
    try {
      const user = await dbUsers.findOne({
        _id: userId,
      })
      if (!user) {
        throw new Error('Invalid account')
      }
      const multiFactor = await dbMultiFactorAuths.findOne({
        user: userId,
        type: 'test',
        used: false,
        expiredAt: {
          gte: new Date(),
        },
      })

      const code = Math.floor(100000 + randomNumber() * 900000)
      const successMessage = `Email was sent to ${user.email}, please check before it expires.`
      const sendEmailParams = {
        to: user.email,
        code: String(code),
      } as TSendEmailParams & { code: string }
      const authEmail = new AuthEmail()
      if (!multiFactor) {
        authEmail.sendMFA(sendEmailParams)
        const newMFA = new dbMultiFactorAuths({
          user: userId,
          code: String(code),
          type: 'test',
          expiredAt: new Date(),
        })
        await newMFA.save()
        res.json(response.success({ message: successMessage }))
      } else {
        authEmail.sendMFA(sendEmailParams)
        res.json(response.success({ message: successMessage }))
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const mfaVerify = async (req: Request, res: Response) => {
  const { userId, code } = req.body
  if (userId && code) {
    try {
      const user = await dbUsers.findOne({ _id: userId })
      if (!user) {
        throw new Error('Invalid account')
      }
      const multiFactor = await dbMultiFactorAuths.findOne({
        userId: userId,
        code: String(code),
        type: 'test',
        used: false,
        expiredAt: {
          gte: new Date(),
        },
      })
      if (multiFactor) {
        await dbMultiFactorAuths.findByIdAndUpdate(
          multiFactor._id,
          {
            $set: {
              used: true,
            },
          },
          { new: true }
        )
        res.json(
          response.success({
            message: 'User Verified',
          })
        )
      } else {
        res.json(response.error({ message: 'Invalid or expired token' }))
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
  }
}

export const userDetails = async (req: Request, res: Response) => {
  const email = res.locals.user.email
  if (email) {
    try {
      const user = await dbUsers
        .findOne({ email: email, deletedAt: null })
        .populate({
          path: 'guest',
          populate: [{ path: 'address' }, { path: 'emergencyContacts' }],
        })
      res.json(
        response.success({
          item: {
            id: user?._id,
            email: user?.email,
            canReceivedEmail: user?.canReceiveEmail,
            registrationType: user?.registrationType,
            profilePicture: user?.profilePicture,
            personalInfo: user?.guest,
          },
        })
      )
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message ? err.message : UNKNOWN_ERROR_OCCURRED,
        })
      )
    }
  } else {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
}

export const setCanReceiveEmail = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const canReceive = req.body.canReceive
  if (typeof canReceive === 'boolean') {
    try {
      const user = await dbUsers.findOne({ _id: userId, deletedAt: null })
      if (user) {
        const setCanReceiveEmail = await dbUsers.findByIdAndUpdate(
          userId,
          {
            $set: {
              canReceiveEmail: canReceive,
            },
          },
          { new: true }
        )
        res.json(
          response.success({
            item: setCanReceiveEmail,
            message: canReceive
              ? `You will now received an email from ${APP_NAME}`
              : `You are now removed from ${APP_NAME} email notification`,
          })
        )
      } else {
        res.json(
          response.error({
            message: USER_NOT_AUTHORIZED,
          })
        )
      }
    } catch (err: any) {
      res.json(
        response.error({
          message: err.message,
        })
      )
    }
  } else {
    res.json(
      response.error({
        message: REQUIRED_VALUE_EMPTY,
      })
    )
  }
}
