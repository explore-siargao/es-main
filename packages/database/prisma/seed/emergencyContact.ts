import { prisma } from "./"

export const emergencyContact = async () => {
  const getPersonalInfos = await prisma.guests.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createEmergencyContact = await prisma.emergencyContacts.createMany({
    data: [
      {
        name: "Luz Fernandez",
        peronalInfoId: getPersonalInfos[0]?.id || 0,
        relationship: "Aunt",
        email: "luz.fernandez@yahoo.com",
        phoneNumber: "09222222222",
      },
      {
        name: "Julita Kaharian",
        peronalInfoId: getPersonalInfos[1]?.id || 0,
        relationship: "Mother",
        email: "julita@gmail.com",
        phoneNumber: "09090909097",
      },
      {
        name: "Juan Dela Cruz",
        peronalInfoId: getPersonalInfos[2]?.id || 0,
        relationship: "Father",
        email: " juan.dc@gmail.com",
        phoneNumber: "09123456789",
      },
      {
        name: "Maria Santos",
        peronalInfoId: getPersonalInfos[3]?.id || 0,
        relationship: "Sister",
        email: "maria.santos@example.com",
        phoneNumber: "09876543210",
      },
      {
        name: "Pedro Reyes",
        peronalInfoId: getPersonalInfos[4]?.id || 0,
        relationship: "Brother",
        email: "pedro.reyes@gmail.com",
        phoneNumber: "09567890123",
      },
    ],
  })

  console.log({ createEmergencyContact })
}
