import { prisma } from "./"

export const guest = async () => {
  const getUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createPersonalInfos = await prisma.guests.createMany({
    data: [
      {
        firstName: "Diana",
        lastName: "Ramos",
        birthDate: "2000-02-19T12:34:56.789Z",
        userId: getUsers[0]?.id ? getUsers[0].id : 0,
        phone: "555-7777",
        cellPhone: "09092558726",
        country: "PH",
        currency: "PHP",
        language: "English",
        gender: "M",
        confirm: JSON.stringify({
          identity: true,
          emailAddress: true,
          phoneNumber: true,
        }),
      },
      {
        firstName: "Ramil",
        lastName: "Kaharian",
        birthDate: "2014-02-19T12:34:56.789Z",
        userId: getUsers[1]?.id ? getUsers[1].id : 0,
        phone: "554-222",
        cellPhone: "09092558726",
        country: "PH",
        currency: "PHP",
        language: "English",
        gender: "M",
        confirm: JSON.stringify({
          identity: true,
          emailAddress: true,
          phoneNumber: true,
        }),
      },
      {
        firstName: "John",
        lastName: "Madrigal",
        birthDate: "2014-02-19T12:34:56.789Z",
        userId: getUsers[2]?.id ? getUsers[2].id : 0,
        phone: "",
        cellPhone: "09092558726",
        gender: "M",
        country: "PH",
        currency: "PHP",
        language: "English",
        confirm: JSON.stringify({
          identity: true,
          emailAddress: true,
          phoneNumber: true,
        }),
      },
      {
        firstName: "Richard",
        lastName: "Dela pena",
        birthDate: "2014-02-19T12:34:56.789Z",
        userId: getUsers[3]?.id ? getUsers[3].id : 0,
        phone: "",
        cellPhone: "09092558726",
        gender: "M",
        country: "PH",
        currency: "PHP",
        language: "English",
        confirm: JSON.stringify({
          identity: true,
          emailAddress: true,
          phoneNumber: true,
        }),
      },
      {
        firstName: "Arjhay",
        lastName: "Andal",
        birthDate: "2014-02-19T12:34:56.789Z",
        userId: getUsers[4]?.id ? getUsers[4].id : 0,
        phone: "554-757",
        cellPhone: "09092558726",
        gender: "M",
        country: "PH",
        currency: "PHP",
        language: "English",
        confirm: JSON.stringify({
          identity: true,
          emailAddress: true,
          phoneNumber: true,
        }),
      },
      {
        firstName: "John Patrick",
        lastName: "Madrigal",
        birthDate: "2014-02-19T12:34:56.789Z",
        userId: getUsers[5]?.id ? getUsers[5].id : 0,
        phone: "",
        cellPhone: "",
        gender: "M",
        country: "PH",
        currency: "PHP",
        language: "English",
        confirm: JSON.stringify({
          identity: false,
          emailAddress: false,
          phoneNumber: false,
        }),
      },
    ],
  })
  console.log({ createPersonalInfos })
}
