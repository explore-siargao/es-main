import { Response, Request } from 'express'
import { prisma } from '@/common/helpers/prismaClient'
import {
  REQUIRED_VALUE_EMPTY,
  UNKNOWN_ERROR_OCCURRED,
  USER_NOT_AUTHORIZED,
  USER_NOT_EXIST,
} from '@/common/constants'
import { APP_NAME } from '@repo/constants'
import dayjs from 'dayjs'
import { AuthEmail } from './authEmail'
import verifyCaptcha from '@/common/helpers/verifyCaptcha'
import { capitalize } from 'lodash'
import { E_RegistrationType, Z_UserRegister } from '@repo/contract'
import { ResponseService } from '@/common/service/response'
import randomNumber from '@/common/helpers/randomNumber'
import { currencyByCountry } from '@/common/helpers/currencyByCountry'
import { EncryptionService } from '@repo/services'
import { WEB_URL } from '@/common/constants/ev'

const response = new ResponseService()
const decryptionService = new EncryptionService('password')
const encryptionService = new EncryptionService('password')

export const verifySignIn = async (req: Request, res: Response) => {
  const { type, email } = req.query
  if (type && email) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email as string,
        },
        include: {
          guest: true,
        },
      })
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
            message: `Invalid login method, please login using your ${type} account`,
          })
        )
      } else if (
        user &&
        user.registrationType === E_RegistrationType.Manual &&
        isSocial
      ) {
        res.json(
          response.error({
            message: `Invalid login method, please login using your password`,
          })
        )
      } else if ((!user && type === 'google') || type === 'facebook') {
        res.json(
          response.success({
            action: {
              type: 'SOCIAL_REGISTER',
              description: type,
            },
            message: 'Email is not registered',
          })
        )
      } else {
        res.json(
          response.success({
            message: 'Email is not registered',
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

export const verifySession = async (req: Request, res: Response) => {
  res.json(response.success({ item: res.locals.user }))
}

export const register = async (req: Request, res: Response) => {
  const isInputValid = Z_UserRegister.safeParse(req.body)
  if (isInputValid.success) {
    const {
      email,
      password,
      firstName,
      lastName,
      birthDate,
      gender,
      registrationType,
      country,
      canReceiveEmail,
    } = req.body

    const currency: string =
      currencyByCountry[country as keyof typeof currencyByCountry]
    const selectedCurrency = currency ?? 'USD'
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      })
      if (!user) {
        const encryptedPassword = encryptionService.encrypt(password)
        const newUser = await prisma.user.create({
          data: {
            email: email,
            registrationType: registrationType,
            role: 'User',
            password: encryptedPassword,
            canReceiveEmail,
          },
        })

        const newPersonalInfo = await prisma.guests.create({
          data: {
            userId: newUser.id,
            firstName: firstName,
            middleName: '',
            lastName: lastName,
            birthDate: dayjs(birthDate).format(),
            phone: '',
            cellPhone: '',
            country: country,
            language: 'English',
            companyName: '',
            companyTaxId: null,
            gender: gender,
            currency: selectedCurrency,
            confirm: JSON.stringify({
              identity: false,
              email: false,
              phone: false,
            }),
          },
        })

        res.json(
          response.success({
            item: {
              personalInfo: newPersonalInfo,
            },
            message: 'Successfully registered',
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
      const user = await prisma.user.findFirst({
        where: {
          email: email,
          registrationType: E_RegistrationType.Manual,
        },
        include: {
          guest: true,
        },
      })
      if (!user) {
        throw new Error('Email or password is invalid')
      }
      const decryptedPassword = decryptionService.decrypt(
        user?.password as string
      )
      const originalPassword = decryptedPassword.toString()
      const decryptInputPassword = decryptionService.decrypt(password)
      if (user && originalPassword === decryptInputPassword) {
        res.json(response.success({}))
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
  const csrfToken = req.headers['x-csrf-token']
  if (csrfToken) {
    const { email } = req.body
    if (email) {
      try {
        const user = await prisma.user.findFirst({
          where: {
            email: email,
          },
          include: {
            guest: true,
          },
        })
        if (user) {
          res.json(
            response.success({
              item: {
                name: `${user.guest?.firstName} ${user.guest?.lastName}`,
                email: user.email,
              },
            })
          )
        } else {
          res.json(response.error({ message: 'No data found' }))
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
  } else {
    res.json(response.error({ message: USER_NOT_AUTHORIZED }))
  }
}

export const forgot = async (req: Request, res: Response) => {
  const { token, email } = req.body
  if (email && token) {
    try {
      const isCaptchaTokenValid = await verifyCaptcha(token)
      if (!isCaptchaTokenValid) {
        throw new Error('CAPTCHA is invalid')
      }
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      })
      if (!user) {
        throw new Error('This email does not exist in our records')
      }
      if (user && user.registrationType !== 'Manual') {
        throw new Error(
          `Account registration type is invalid, please login using your ${user.registrationType} account.`
        )
      }
      const forgotPassword = await prisma.forgotPassword.findFirst({
        where: {
          email: email,
          used: false,
          expiredAt: {
            gte: new Date(),
          },
        },
      })

      const code = Math.floor(100000 + randomNumber() * 900000)
      const successMessage = `Email was sent to ${email}, please check before it expires.`
      const webVerifyUrl = `${WEB_URL}/new-password?email=${email}&code=${code}`
      const sendEmailParams = { to: email, magicLink: webVerifyUrl }
      const authEmail = new AuthEmail()
      if (!forgotPassword) {
        authEmail.sendForgotPasswordEmail(sendEmailParams)
        await prisma.forgotPassword.create({
          data: {
            email: email,
            code: String(code),
            expiredAt: dayjs().add(30, 'minutes').format(),
          },
        })
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

export const forgotVerify = async (req: Request, res: Response) => {
  const { email, code, newPassword } = req.body
  if (email && code && newPassword) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      })
      if (!user) {
        throw new Error('Some of the values are invalid')
      }
      const forgotPassword = await prisma.forgotPassword.findFirst({
        where: {
          email: email,
          code: String(code),
          used: false,
          expiredAt: {
            gte: new Date(),
          },
        },
      })
      if (forgotPassword) {
        await prisma.forgotPassword.update({
          where: {
            id: forgotPassword.id,
          },
          data: {
            used: true,
          },
        })
        const decryptNewPassword = decryptionService.decrypt(newPassword)
        const encryptPassword = encryptionService.encrypt(decryptNewPassword)
        await prisma.user.update({
          where: {
            email: email,
          },
          include: {
            guest: true,
          },
          data: {
            password: String(encryptPassword),
          },
        })
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

export const mfa = async (req: Request, res: Response) => {
  const { userId } = req.body
  if (userId) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      })
      if (!user) {
        throw new Error('Invalid account')
      }
      const multiFactor = await prisma.multiFactorAuth.findFirst({
        where: {
          userId: Number(userId),
          type: 'test',
          used: false,
          expiredAt: {
            gte: new Date(),
          },
        },
      })

      const code = Math.floor(100000 + randomNumber() * 900000)
      const successMessage = `Email was sent to ${user.email}, please check before it expires.`
      const sendEmailParams = { to: user.email, code: String(code) }
      const authEmail = new AuthEmail()
      if (!multiFactor) {
        authEmail.sendMFA(sendEmailParams)
        await prisma.multiFactorAuth.create({
          data: {
            userId: Number(userId),
            code: String(code),
            type: 'test',
            expiredAt: dayjs().add(3, 'minutes').format(),
          },
        })
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
      const user = await prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      })
      if (!user) {
        throw new Error('Invalid account')
      }
      const multiFactor = await prisma.multiFactorAuth.findFirst({
        where: {
          userId: Number(userId),
          code: String(code),
          type: 'test',
          used: false,
          expiredAt: {
            gte: new Date(),
          },
        },
      })
      if (multiFactor) {
        await prisma.multiFactorAuth.update({
          where: {
            id: multiFactor.id,
          },
          data: {
            used: true,
          },
        })
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

export const updateUserEmail = async (req: Request, res: Response) => {
  const { email } = req.body
  const userId = Number(req.params.userId)
  try {
    const getUser = await prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
      include: {
        guest: true,
      },
    })
    if (getUser) {
      if (email) {
        if (String(email).indexOf('@') > 1) {
          const updateEmail = await prisma.user.update({
            where: {
              id: userId,
              deletedAt: null,
            },
            data: {
              email: email,
            },
          })

          res.json(
            response.success({
              item: {
                user: updateEmail,
              },
              message: 'Sucessfully updated',
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

export const userDetails = async (req: Request, res: Response) => {
  const email = res.locals.user.email
  if (email) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
          deletedAt: null,
        },
        include: {
          guest: {
            include: {
              Address: true,
              emergencyContacts: true,
            },
          },
        },
      })
      res.json(
        response.success({
          item: {
            id: user?.id,
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
  const userId = Number(req.params.userId)
  const canReceive = req.body.canReceive
  if (typeof canReceive === 'boolean') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
      if (user !== null) {
        const setCanReceiveEmail = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            canReceiveEmail: canReceive,
          },
        })
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
