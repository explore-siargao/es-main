import { prisma } from "./"

export const coupon = async () => {
  const getUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  })
  const createCoupons = await prisma.coupon.createMany({
    data: [
      {
        createdBy: getUsers[0]?.id,
        code: "123456",
        expirationDate: "2024-04-29T03:01:27.936Z",
        isUsed: false,
        reward: "Free food",
      },
      {
        createdBy: getUsers[0]?.id,
        code: "ABCDEF",
        expirationDate: "2024-04-29T03:01:27.936Z",
        isUsed: true,
        reward: "Free food",
        usedBy: getUsers[4]?.id,
      },
      {
        createdBy: getUsers[1]?.id,
        code: "PASSWORD",
        expirationDate: "2024-04-29T03:01:27.936Z",
        isUsed: false,
        reward: "Free tour",
      },
      {
        createdBy: getUsers[2]?.id,
        code: "HELLOWORLD",
        expirationDate: "2024-04-29T03:01:27.936Z",
        isUsed: false,
        reward: "!000 USD",
      },
      {
        createdBy: getUsers[2]?.id,
        code: "55500A",
        expirationDate: "2024-04-29T03:01:27.936Z",
        isUsed: false,
        reward: "Free food",
      },
    ],
  })
  console.log({ createCoupons })
}
