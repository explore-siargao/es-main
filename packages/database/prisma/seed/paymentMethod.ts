import { prisma } from "./"

export const paymentMethod = async () => {
  const getUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  })
  const createPaymentMethod = await prisma.paymentMethod.createMany({
    data: [
      {
        userId: getUsers[0]?.id || 0,
        cardInfo:
          "U2FsdGVkX1/tN3vJv8rYUlKGK8A4xaYdsd3BdDKZ0ZKxhsB/nvGDgOjrshwtsXObtBB08dE6ipSepUImorwZ5BoS4xMqlvtRfeJWrr2DZR0pQlUvk4XDFHVgHWfme9wfmyCvVKreVjt6bFZRuT/2wP+MOlsEcOYmTPNBQjQcNCKB4bXdlrFXXZUNV0eI+F6Zsk//uNOyXUubOCGZ+0Jq+aZ+x0D6xHZXwnHsKjtgc7s=",
        cardType: "Visa",
        lastFour: "4242",
        isDefault: true,
      },
      {
        userId: getUsers[1]?.id || 0,
        cardInfo:
          "U2FsdGVkX1/tN3vJv8rYUlKGK8A4xaYdsd3BdDKZ0ZKxhsB/nvGDgOjrshwtsXObtBB08dE6ipSepUImorwZ5BoS4xMqlvtRfeJWrr2DZR0pQlUvk4XDFHVgHWfme9wfmyCvVKreVjt6bFZRuT/2wP+MOlsEcOYmTPNBQjQcNCKB4bXdlrFXXZUNV0eI+F6Zsk//uNOyXUubOCGZ+0Jq+aZ+x0D6xHZXwnHsKjtgc7s=",
        cardType: "Visa",
        lastFour: "4242",
        isDefault: false,
      },
      {
        userId: getUsers[2]?.id || 0,
        cardInfo:
          "U2FsdGVkX1/tN3vJv8rYUlKGK8A4xaYdsd3BdDKZ0ZKxhsB/nvGDgOjrshwtsXObtBB08dE6ipSepUImorwZ5BoS4xMqlvtRfeJWrr2DZR0pQlUvk4XDFHVgHWfme9wfmyCvVKreVjt6bFZRuT/2wP+MOlsEcOYmTPNBQjQcNCKB4bXdlrFXXZUNV0eI+F6Zsk//uNOyXUubOCGZ+0Jq+aZ+x0D6xHZXwnHsKjtgc7s=",
        cardType: "Visa",
        lastFour: "4242",
        isDefault: false,
      },
      {
        userId: getUsers[3]?.id || 0,
        cardInfo:
          "U2FsdGVkX1/tN3vJv8rYUlKGK8A4xaYdsd3BdDKZ0ZKxhsB/nvGDgOjrshwtsXObtBB08dE6ipSepUImorwZ5BoS4xMqlvtRfeJWrr2DZR0pQlUvk4XDFHVgHWfme9wfmyCvVKreVjt6bFZRuT/2wP+MOlsEcOYmTPNBQjQcNCKB4bXdlrFXXZUNV0eI+F6Zsk//uNOyXUubOCGZ+0Jq+aZ+x0D6xHZXwnHsKjtgc7s=",
        cardType: "Visa",
        lastFour: "4242",
        isDefault: true,
      },
      {
        userId: getUsers[4]?.id || 0,
        cardInfo:
          "U2FsdGVkX1/tN3vJv8rYUlKGK8A4xaYdsd3BdDKZ0ZKxhsB/nvGDgOjrshwtsXObtBB08dE6ipSepUImorwZ5BoS4xMqlvtRfeJWrr2DZR0pQlUvk4XDFHVgHWfme9wfmyCvVKreVjt6bFZRuT/2wP+MOlsEcOYmTPNBQjQcNCKB4bXdlrFXXZUNV0eI+F6Zsk//uNOyXUubOCGZ+0Jq+aZ+x0D6xHZXwnHsKjtgc7s=",
        cardType: "Visa",
        lastFour: "4242",
        isDefault: true,
      },
    ],
  })
  console.log({ createPaymentMethod })
}
