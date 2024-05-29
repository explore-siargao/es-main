import { prisma } from "./"

export const forgotPassword = async () => {
  const createForgotPassword = await prisma.forgotPassword.createMany({
    data: [
      {
        email: "ramilkaharian25@gmail.com",
        code: "999111",
        expiredAt: new Date(),
        used: true,
      },
      {
        email: "ramilkaharian25@gmail.com",
        code: "909057",
        expiredAt: new Date(),
        used: true,
      },
      {
        email: "ramilkaharian25@gmail.com",
        code: "981203",
        expiredAt: new Date(),
        used: true,
      },
      {
        email: "ramilkaharian25@gmail.com",
        code: "665111",
        expiredAt: new Date(),
        used: true,
      },
      {
        email: "ramilkaharian25@gmail.com",
        code: "432100",
        expiredAt: new Date(),
        used: false,
      },
    ],
  })
  console.log({ createForgotPassword })
}
