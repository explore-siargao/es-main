import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import { T_Cart_Item } from "@repo/contract-2/cart"
import AddGuestModal from "../../modals/add-guest-modal"
import EditGuestModal from "../../modals/edit-guest-modal"

type ContactsProps = {
  cartItem: T_Cart_Item;
  isViewOnly?: boolean;
};

const RentalContacts = ({ cartItem, isViewOnly }: ContactsProps) => {
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false)
  const [isEditGuestModalOpen, setIsEditGuestModalOpen] = useState(false)
  const [contactIndex, setContactIndex] = useState(0)
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
      {!isViewOnly &&    <div className="flex flex-wrap items-center gap-2">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 cursor-pointer bg-primary-200 text-primary-900`}
        >
          <span className="text-sm">{`${defaultContact.firstName} ${defaultContact.lastName}`}</span>
        </div>
        <button
          onClick={() => setIsAddGuestModalOpen(true)}
          className="inline-flex items-center gap-1 text-sm rounded-full border-2 border-primary-200 border-dashed px-3 py-1 text-primary-900 hover:bg-primary-100 transition"
        >
          <span>+</span>
          <span>Add</span>
        </button>
      </div>}
   

      {/* Contact Info */}
      {!isViewOnly && defaultContact && (
        <div className="grid gap-2">
          <div className="grid grid-cols-2">
            <Typography variant="h5" className="text-text-300">
              First name
            </Typography>
            <Typography variant="h5" className="font-medium text-text-500">
              {defaultContact.firstName}
            </Typography>
          </div>
          <div className="grid grid-cols-2">
            <Typography variant="h5" className="text-text-300">
              Last name
            </Typography>
            <Typography variant="h5" className="font-medium text-text-500">
              {defaultContact.lastName}
            </Typography>
          </div>
          <div className="grid grid-cols-2">
            <Typography variant="h5" className="text-text-300">
              Phone number
            </Typography>
            <Typography variant="h5" className="font-medium text-text-500">
              {defaultContact.phoneNumber}
            </Typography>
          </div>
          <div className="grid grid-cols-2 items-center">
            <Typography variant="h5" className="text-text-300">
              Email (for updates on your booking)
            </Typography>
            <div className="flex items-center justify-between">
              <Typography
                variant="h5"
                className="font-medium text-text-500 mr-4"
              >
                {defaultContact.email}
              </Typography>
            </div>
          </div>
        </div>
      )}
      {cartItem.contacts?.map((contact, index) => (
        <div key={index} className="grid gap-2">
          <div className="grid grid-cols-2">
            <Typography variant="h5" className="text-text-300">
              First name
            </Typography>
            <Typography variant="h5" className="font-medium text-text-500">
              {contact.firstName}
            </Typography>
          </div>
          <div className="grid grid-cols-2">
            <Typography variant="h5" className="text-text-300">
              Last name
            </Typography>
            <Typography variant="h5" className="font-medium text-text-500">
              {contact.lastName}
            </Typography>
          </div>
          <div className="grid grid-cols-2">
            <Typography variant="h5" className="text-text-300">
              Phone number
            </Typography>
            <Typography variant="h5" className="font-medium text-text-500">
              {contact.phoneNumber}
            </Typography>
          </div>
          <div className="grid grid-cols-2 items-center">
            <Typography variant="h5" className="text-text-300">
              Email (for updates on your booking)
            </Typography>
            <div className="flex items-center justify-between">
              <Typography
                variant="h5"
                className="font-medium text-text-500 mr-4"
              >
                {contact.email}
              </Typography>
             {!isViewOnly && <button
                className="font-medium underline transition hover:text-primary-500"
                onClick={() => {
                  setContactIndex(index)
                  setIsEditGuestModalOpen(true)
                }}
              >
                Edit
              </button>}
            </div>
          </div>
        </div>
      ))}
      <EditGuestModal
        isOpen={isEditGuestModalOpen}
        closeModal={() => setIsEditGuestModalOpen(false)}
        cartItem={cartItem}
        contactIndex={contactIndex}
      />
      <AddGuestModal
        isOpen={isAddGuestModalOpen}
        closeModal={() => setIsAddGuestModalOpen(false)}
        cartItem={cartItem}
      />
    </div>
  )
}

export default RentalContacts
