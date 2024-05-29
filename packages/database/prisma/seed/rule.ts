import { prisma } from "./"

export const rule = async () => {
  const getCancellationPolicies = await prisma.cancellationPolicy.findMany({
    where: {
      deletedAt: null,
    },
  })

  const getSafetyProperties = await prisma.safetyProperty.findMany({
    where: {
      deletedAt: null,
    },
  })

  const getHouseRules = await prisma.houseRule.findMany({
    where: {
      deletedAt: null,
    },
  })

  const createRules = await prisma.rule.createMany({
    data: [
      {
        icon: "Clock",
        rule: "Check-in after 3:00 PM",
        description: "",
        houseRuleId: getHouseRules[0]?.id,
      },
      {
        icon: "Clock",
        rule: "Checkout before 11:00 AM",
        description: "",
        houseRuleId: getHouseRules[0]?.id,
      },
      {
        icon: "People",
        rule: "4 guests maximum",
        description: "",
        houseRuleId: getHouseRules[1]?.id,
      },
      {
        icon: "Moon",
        rule: "Quiet hours",
        description: "",
        houseRuleId: getHouseRules[1]?.id,
      },
      {
        icon: "Camera",
        rule: "Commercial photography allowed",
        description: "",
        houseRuleId: getHouseRules[1]?.id,
      },

      {
        icon: "Sea",
        rule: "Pool/hot tub without a gate or lock",
        description: "",
        safePropertyId: getSafetyProperties[0]?.id,
      },
      {
        icon: "Warning",
        rule: "Climbing or play structure",
        description:
          "The Legaspi park is 2mins walk from my building and has a playground for children.",
        safePropertyId: getSafetyProperties[0]?.id,
      },
      {
        icon: "CCTV",
        rule: "Security camera/recording device",
        description:
          "For security purposes, we have one CCTV facing the entrance of the main door. ",
        safePropertyId: getSafetyProperties[1]?.id,
      },
      {
        icon: "Stair",
        rule: "Must climb stairs",
        description: "1 level",
        safePropertyId: getSafetyProperties[3]?.id,
      },
      {
        icon: "Car",
        rule: "No parking on property",
        description:
          "1) FREE PARKING (BACK STREETS) - Monday to Saturday (5pm to 7am) - Sunday (whole day) - Holidays (whole day) 2) PAID PARKING - Monday to Saturday (back streets. 7am to 5pm) - Establishments paid parking: tinyurl(dot)com/makatiparking",
        safePropertyId: getSafetyProperties[3]?.id,
      },

      {
        icon: "",
        rule: "Partial refund",
        description:
          "Get back every night that remains 24 hours after you cancel. No refund of nights you spent or the service fee.",
        cancellationPolicyId: getCancellationPolicies[0]?.id,
      },
      {
        icon: "",
        rule: "No refund",
        description: "",
        cancellationPolicyId: getCancellationPolicies[0]?.id,
      },
      {
        icon: "",
        rule: "No refund",
        description: "",
        cancellationPolicyId: getCancellationPolicies[2]?.id,
      },
      {
        icon: "",
        rule: "No refund",
        description: "",
        cancellationPolicyId: getCancellationPolicies[3]?.id,
      },
      {
        icon: "",
        rule: "No refund",
        description: "",
        cancellationPolicyId: getCancellationPolicies[4]?.id,
      },
    ],
  })
  console.log({ createRules })
}
