import { dbHostApproval, dbUsers } from "@repo/database"

const seedHostApprovals = async () => {
  console.log("Seeding host approvals...")
  try {
    const host = await dbUsers.findOne({ isHost: true })
    await dbHostApproval.insertMany([
      {
        businessType: "Hotel",
        companyName: "Hotel One",
        brn: "123-456-789",
        registeredAddress: "Siargao City",
        userId: host?._id,
        photocopyBusinessPermit: {
          fileKey: "f204e5e6-525b-4631-9287-ab8dd943b092",
          createdAt: new Date(),
        },
        createdAt: new Date(),
      },
      {
        businessType: "Apartment",
        companyName: "Apartment One",
        brn: "123-456-780",
        registeredAddress: "Siargao City",
        userId: host?._id,
        photocopyBusinessPermit: {
          fileKey: "f204e5e6-525b-4631-9287-ab8dd943b092",
          createdAt: new Date(),
        },
        createdAt: new Date(),
      },
      {
        businessType: "Hostel",
        companyName: "Hostel One",
        brn: "123-456-785",
        registeredAddress: "Siargao City",
        userId: host?._id,
        photocopyBusinessPermit: {
          fileKey: "f204e5e6-525b-4631-9287-ab8dd943b092",
          createdAt: new Date(),
        },
        createdAt: new Date(),
      },
      {
        businessType: "Resort",
        companyName: "Resort One",
        brn: "123-456-787",
        registeredAddress: "Siargao City",
        userId: host?._id,
        photocopyBusinessPermit: {
          fileKey: "f204e5e6-525b-4631-9287-ab8dd943b092",
          createdAt: new Date(),
        },
        createdAt: new Date(),
      },
      {
        businessType: "Rentals Vehicles",
        companyName: "Rentals One",
        brn: "123-456-782",
        registeredAddress: "Siargao City",
        userId: host?._id,
        photocopyBusinessPermit: {
          fileKey: "f204e5e6-525b-4631-9287-ab8dd943b092",
          createdAt: new Date(),
        },
        createdAt: new Date(),
      },
    ])
    console.log("Host approvals seeded successfully")
  } catch (err: any) {
    console.error("Error seeding host approvals, ", err)
  }
}

export default seedHostApprovals
