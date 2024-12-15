import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { T_Cart_Item } from "@repo/contract-2/cart"

const RentalContacts = ({ cartItem }: { cartItem: T_Cart_Item }) => {
  const defaultContact = {
    firstName: cartItem.userId?.guest.firstName,
    lastName: cartItem.userId?.guest.lastName,
    phoneNumber: cartItem.userId?.guest.phone,
    email: cartItem.userId?.email,
  }

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-lg font-semibold">Contact info</h2>
      <Typography className="text-text-400">
        We’ll contact you only if there’s any updates to your booking.
      </Typography>

      {/* Contact Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 cursor-pointer bg-primary-200 text-primary-900`}
        >
          <span className="text-sm">{`${defaultContact.firstName} ${defaultContact.lastName}`}</span>
        </div>
      </div>

      {/* Contact Info */}
      {defaultContact && (
        <div className="grid gap-2">
          <div className="grid grid-cols-2">
            <Typography variant="h5" className="text-text-300">First name</Typography>
            <Typography variant="h5" className="font-medium text-text-500">
              {defaultContact.firstName}
            </Typography>
          </div>
          <div className="grid grid-cols-2">
            <Typography variant="h5" className="text-text-300">Last name</Typography>
            <Typography variant="h5" className="font-medium text-text-500">
              {defaultContact.lastName}
            </Typography>
          </div>
          <div className="grid grid-cols-2">
            <Typography variant="h5" className="text-text-300">Phone number</Typography>
            <Typography variant="h5" className="font-medium text-text-500">
              {defaultContact.phoneNumber}
            </Typography>
          </div>
          <div className="grid grid-cols-2 items-center">
            <Typography variant="h5" className="text-text-300">
              Email (for updates on your booking)
            </Typography>
            <div className="flex items-center justify-between">
              <Typography variant="h5" className="font-medium text-text-500 mr-4">
                {defaultContact.email}
              </Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RentalContacts
