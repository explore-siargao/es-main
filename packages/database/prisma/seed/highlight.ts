import { prisma } from "./"

export const highlight = async () => {
  const createHighlights = await prisma.highLights.createMany({
    data: [
      {
        icon: "Wifi",
        title: "Great for remote work",
        details: "Fast wifi at 165 Mbps, plus a dedicated workspace.",
      },
      {
        icon: "Clock",
        title: "Self check-in",
        details: "You can check in with the building staff.",
      },
      {
        icon: "MapPin",
        title: "Great location",
        details: "95% of recent guests gave the location a 5-star rating",
      },
      {
        icon: "Clock",
        title: "Great check-in experience",
        details:
          "100% of recent guests gave the check-in process a 5-star rating.",
      },
      {
        icon: "calendar",
        title: "Free cancellation before March 24",
        details: "",
      },
    ],
  })
  console.log({ createHighlights })
}
