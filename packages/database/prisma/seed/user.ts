import { prisma } from "./"
import CryptoJS from "crypto-js"

const PASSWORD_ENCRYPT_KEY = process.env.PASSWORD_ENCRYPT_KEY || ""

export const users = async () => {
  const createUsers = await prisma.user.createMany({
    data: [
      {
        email: "diana@ramos.com",
        password: String(CryptoJS.AES.encrypt("test", PASSWORD_ENCRYPT_KEY)),
        registrationType: "Manual",
        role: "User",
        isHost: true,
      },
      {
        email: "ramilkaharian25@gmail.com",
        registrationType: "Google",
        role: "User",
        isHost: true,
      },
      {
        email: "jp.madrigal07@gmail.com",
        password: String(
          CryptoJS.AES.encrypt("@Patrick22", PASSWORD_ENCRYPT_KEY)
        ),
        registrationType: "Manual",
        role: "User",
        isHost: true,
      },
      {
        email: "richard.delapena19@gmail.com",
        registrationType: "Google",
        role: "User",
      },
      {
        email: "arjayandal93@gmail.com",
        registrationType: "Google",
        role: "User",
      },
      {
        email: "jepoyyy0225@gmail.com",
        password: String(
          CryptoJS.AES.encrypt("@Patrick22", PASSWORD_ENCRYPT_KEY)
        ),
        registrationType: "Manual",
        role: "Admin",
      },
    ],
  })
  console.log({ createUsers })
}
