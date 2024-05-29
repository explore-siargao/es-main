import { address } from "./address"
import { basicAboutPlace } from "./basicAboutPlace"
import { coupon } from "./coupon"
import { emergencyContact } from "./emergencyContact"
import { highlight } from "./highlight"
import { listing } from "./listing"
import { listingDescription } from "./listingDescription"
import { listingPrice } from "./listingPrice"
import { paymentMethod } from "./paymentMethod"
import { guest } from "./guest"
import { placeOffer } from "./placeOffer"
import { tax } from "./tax"
import { users } from "./user"
import { wishGroup } from "./wishGroup"
import { review } from "./review"
import { reportListing } from "./reportListing"
import { listingHighlight } from "./listingHighlight"
import { listingPlaceOffer } from "./listingPlaceOffer"
import { houseRule } from "./houseRule"
import { safeProperty } from "./safeProperty"
import { cancellationPolicy } from "./cancellationPolicy"
import { rule } from "./rule"
import { forgotPassword } from "./forgotPassword"
import { multiAuth } from "./multiAuth"
import { reportUser } from "./reportUser"
import { PrismaClient } from "@prisma/client"
export const prisma = new PrismaClient()
const main = async () => {
  await users()
  await guest()
  await address()
  await tax()
  await emergencyContact()
  await paymentMethod()
  await basicAboutPlace()
  await highlight()
  await placeOffer()
  await listingPrice()
  await listing()
  await listingDescription()
  await coupon()
  await wishGroup()
  await review()
  await reportListing()
  await listingHighlight()
  await listingPlaceOffer()
  await houseRule()
  await safeProperty()
  await cancellationPolicy()
  await rule()
  await forgotPassword()
  await multiAuth()
  await reportUser()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
