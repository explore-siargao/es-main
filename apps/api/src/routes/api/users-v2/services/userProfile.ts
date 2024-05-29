import { ResponseService } from '@/common/service/response'
import { Request, Response } from 'express'

let profiles = [
  {
    id: '664c52cce1a3560632548b19',
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
    id: '664d5b7aeb85b45c50566ad4',
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
    id: '664d5f5fd9f2900aea4dc0aa',
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
    id: '664d5f5fd9f2900aea4dc0vc',
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
    id: '664d5f5fd9f2900aea4dwe32',
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
  const userId = res.locals.user.id
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
  const userId = res.locals.user.id
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
      id: profiles[index]?.id || '664c52cce1a3560632548b19',
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
