import { prisma } from "./"

export const multiAuth = async () => {
  const getUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createMultiAuths = await prisma.multiFactorAuth.createMany({
    data: [
      {
        userId: getUsers[0]?.id || 0,
        code: "222111",
        expiredAt: new Date(),
        type: "Google",
        used: true,
      },
      {
        userId: getUsers[0]?.id || 0,
        code: "881122",
        expiredAt: new Date(),
        type: "Facebook",
        used: true,
      },
      {
        userId: getUsers[1]?.id || 0,
        code: "765432",
        expiredAt: new Date(),
        type: "Google",
        used: true,
      },
      {
        userId: getUsers[2]?.id || 0,
        code: "870123",
        expiredAt: new Date(),
        type: "Google",
        used: true,
      },
      {
        userId: getUsers[3]?.id || 0,
        code: "470356",
        expiredAt: new Date(),
        type: "Google",
        used: true,
      },
    ],
  })
  console.log({ createMultiAuths })
}
