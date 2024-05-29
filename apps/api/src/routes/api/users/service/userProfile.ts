import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'
let profiles = [
  {
    id: 1,
    imageKey: '1.jpg',
    imageFile: null,
    school: '',
    work: '',
    live: '',
    language: '',
    decadeWereBorn: '',
    favoriteSong: '',
    obsessedWith: '',
    funFact: '',
    uselessSkill: '',
    biography: '',
    spendTime: '',
    pets: '',
    aboutMe: '',
  },
  {
    id: 2,
    imageKey: '1.jpg',
    imageFile: null,
    school: 'Laguna State Polytechnic University',
    work: 'IT',
    live: '',
    language: 'English, French',
    decadeWereBorn: '80s',
    favoriteSong: 'I believe',
    obsessedWith: 'Her',
    funFact: '',
    uselessSkill: '',
    biography: '',
    spendTime: '',
    pets: 'Cat',
    aboutMe: 'I am nice person',
  },
  {
    id: 3,
    imageKey: '1.jpg',
    imageFile: null,
    school: 'SMNHS',
    work: 'Programmer',
    live: '',
    language: 'English',
    decadeWereBorn: '',
    favoriteSong: '',
    obsessedWith: '',
    funFact: '',
    uselessSkill: '',
    biography: 'To see is to believe',
    spendTime: '',
    pets: '',
    aboutMe: '',
  },
  {
    id: 4,
    imageKey: '1.jpg',
    imageFile: null,
    school: '',
    work: '',
    live: '',
    language: '',
    decadeWereBorn: '',
    favoriteSong: '',
    obsessedWith: '',
    funFact: '',
    uselessSkill: 'None',
    biography: 'Never give up',
    spendTime: '',
    pets: 'Dog, Cat',
    aboutMe: 'I am amazing',
  },
  {
    id: 5,
    imageKey: '1.jpg',
    imageFile: null,
    school: 'LSPU',
    work: 'Zkript',
    live: 'Santa Maria Laguna',
    language: 'English, Tagalog',
    decadeWereBorn: '',
    favoriteSong: '',
    obsessedWith: '',
    funFact: '',
    uselessSkill: '',
    biography: '',
    spendTime: '',
    pets: '',
    aboutMe: '',
  },
]

const response = new ResponseService()

export const getProfile = async (req: Request, res: Response) => {
  const userId = Number(res.locals.user.id)
  const getUserProfile = profiles.find((profile) => profile.id === userId)
  if (getUserProfile === undefined) {
    return res.json(response.error({ message: 'This profile not found' }))
  }
  res.json(
    response.success({
      item: getUserProfile,
      allItemCount: 1,
      message: '',
    })
  )
}

export const updateProfile = async (req: Request, res: Response) => {
  const userId = Number(res.locals.user.id)
  const {
    school,
    work,
    favoriteSong,
    obsessedWith,
    decadeWereBorn,
    funFact,
    languageISpeak,
    live,
    uselessSkill,
    biography,
    spendTime,
    pets,
    aboutMe,
    imageFile,
  } = req.body
  const index = profiles.findIndex((profile) => profile.id === userId)
  if (index !== -1) {
    profiles[index] = {
      ...profiles[index],
      id: profiles[index]?.id || 0,
      imageFile: imageFile,
      imageKey: '4.jpg',
      school: school,
      work: work,
      live: live,
      language: languageISpeak,
      decadeWereBorn: decadeWereBorn,
      favoriteSong: favoriteSong,
      obsessedWith: obsessedWith,
      funFact: funFact,
      uselessSkill: uselessSkill,
      biography: biography,
      spendTime: spendTime,
      pets: pets,
      aboutMe: aboutMe,
    }
    res.json(
      response.success({
        item: profiles[index],
        allItemCount: 1,
        message: 'Profile successfully updated',
      })
    )
  }
}

// export const updateProfile = async (req: Request, res: Response) => {
//   const file = req.files
//   const {
//     school,
//     work,
//     live,
//     language,
//     born,
//     favoriteSong,
//     obsessedWith,
//     funFact,
//     uselessSkill,
//     biography,
//     spendTime,
//     pets,
//     aboutMe,
//     imageKey,
//   } = req.body
//   try {
//     const getUser = await prisma.user.findFirst({
//       where: {
//         personalInfo: {
//           userId: res.locals.user.id,
//         },
//       },
//       include: {
//         personalInfo: true,
//       },
//     })
//     if (!getUser) {
//       return res.json(response.error({ message: USER_NOT_EXIST }))
//     }
//     if (
//       file ||
//       imageKey ||
//       school ||
//       work ||
//       live ||
//       language ||
//       born ||
//       favoriteSong ||
//       obsessedWith ||
//       funFact ||
//       uselessSkill ||
//       biography ||
//       spendTime ||
//       pets ||
//       aboutMe
//     ) {
//       const upload = await fileService.upload({files:file})
//       const patchProfile = await prisma.personalInfo.update({
//         where: {
//           id: getUser.personalInfo?.id,
//           deletedAt: null,
//         },
//         data: {
//           profile: JSON.stringify({
//             imageKey: upload.key,
//             school: 'LSPU',
//             work: 'Zkript',
//             live: 'Santa Maria Laguna',
//             language: 'English, Tagalog',
//             decadeWereBorn: '90s',
//             favoriteSong: 'I believe',
//             obsessedWith: 'her',
//             funFact: 'Be honest',
//             uselessSkill: 'None',
//             biography: 'To see is to believed',
//             spendTime: 'Studying',
//             pets: 'Cat, Dog',
//             aboutMe: 'Im a honest person'
//           }),
//         },
//       })
//       res.json(
//         response.success({
//           item: JSON.parse(patchProfile.profile as string),
//           allItemCount: 1,
//           message: 'Profile successfully updated',
//         })
//       )
//     } else {
//       res.json(response.error({ message: REQUIRED_VALUE_EMPTY }))
//     }
//   } catch (err: any) {
//     const message = err.message ? err.message : UNKNOWN_ERROR_OCCURRED
//     res.json(response.error({ message: message }))
//   }
// }
