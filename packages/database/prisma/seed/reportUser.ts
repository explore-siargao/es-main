import { prisma } from "./"

export const reportUser = async () => {
  const getUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createReportUsers = await prisma.reportUser.createMany({
    data: [
      {
        reportedBy: getUsers[1]?.id || 0,
        report: JSON.stringify([
          "Scam",
          "Not reply after payment",
          "Host disappear",
        ]),
        reportedUserId: getUsers[4]?.id || 0,
      },
      {
        reportedBy: getUsers[2]?.id || 0,
        report: JSON.stringify([
          "Scam",
          "Not reply after payment",
          "Host disappear",
        ]),
        reportedUserId: getUsers[4]?.id || 0,
      },
      {
        reportedBy: getUsers[3]?.id || 0,
        report: JSON.stringify([
          "Scam",
          "Not reply after payment",
          "Host disappear",
        ]),
        reportedUserId: getUsers[4]?.id || 0,
      },
      {
        reportedBy: getUsers[1]?.id || 0,
        report: JSON.stringify([
          "Scam",
          "Not reply after payment",
          "Host disappear",
        ]),
        reportedUserId: getUsers[2]?.id || 0,
      },
      {
        reportedBy: getUsers[3]?.id || 0,
        report: JSON.stringify([
          "Scam",
          "Not reply after payment",
          "Host disappear",
        ]),
        reportedUserId: getUsers[2]?.id || 0,
      },
    ],
  })
  console.log({ createReportUsers })
}
