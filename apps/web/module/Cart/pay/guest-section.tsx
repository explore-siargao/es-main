import React, { useState } from 'react';
import EditAddGuestModal from './components/modals/edit-add-guest-modal';

interface Guest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const GuestSection: React.FC = () => {
  const [isEditAddGuestModalOpen, setIsEditAddGuestModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'EDIT' | 'ADD'>('EDIT');
  const [selectedGuestIndex, setSelectedGuestIndex] = useState<number | null>(0);
  const [guests, setGuests] = useState<Guest[]>([
    {
      firstName: 'Ramil',
      lastName: 'Lapitan',
      phoneNumber: '09987643211',
      email: 'ramil@gmail.com',
    }
  ]);

  const openEditModal = (index: number) => {
    setModalAction('EDIT');
    setSelectedGuestIndex(index);
    setIsEditAddGuestModalOpen(true);
  };

  const openAddModal = () => {
    setModalAction('ADD');
    setSelectedGuestIndex(null);
    setIsEditAddGuestModalOpen(true);
  };

  const handleModalSubmit = (guest: Guest) => {
    if (modalAction === 'EDIT' && selectedGuestIndex !== null) {
      // Update the selected guest
      setGuests((prevGuests) =>
        prevGuests.map((g, index) =>
          index === selectedGuestIndex ? { ...guest } : g
        )
      );
    } else if (modalAction === 'ADD') {
      // Add a new guest and select the new one
      setGuests((prevGuests) => [...prevGuests, guest]);
      setSelectedGuestIndex(guests.length);
    }
    setIsEditAddGuestModalOpen(false);
  };

  const selectedGuest = selectedGuestIndex !== null ? guests[selectedGuestIndex] : null;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Contact info</h2>
      <p className="text-sm text-gray-500">
        We’ll contact you only if there’s any updates to your booking.
      </p>

      {/* Contact Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {guests.map((guest, index) => (
          <div
            key={index}
            onClick={() => setSelectedGuestIndex(index)}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 cursor-pointer ${
              selectedGuestIndex === index
                ? 'bg-primary-50 text-primary-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <span className="text-sm">{`${guest.firstName} ${guest.lastName}`}</span>
          </div>
        ))}
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1 rounded-full border border-dashed px-3 py-1 text-sm text-primary-600 hover:bg-primary-50"
        >
          <span>+</span>
          <span>Add</span>
        </button>
      </div>

      {/* Contact Info */}
      {selectedGuest && (
        <div className="grid gap-2">
          <div className="grid grid-cols-2">
            <span className="text-sm text-gray-500">First name</span>
            <span className="text-sm font-medium text-gray-800">
              {selectedGuest.firstName}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-sm text-gray-500">Last name</span>
            <span className="text-sm font-medium text-gray-800">
              {selectedGuest.lastName}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-sm text-gray-500">Phone number</span>
            <span className="text-sm font-medium text-gray-800">
              {selectedGuest.phoneNumber}
            </span>
          </div>
          <div className="grid grid-cols-2 items-center">
            <span className="text-sm text-gray-500">Email (for updates on your booking)</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800 mr-4">
                {selectedGuest.email}
              </span>
              <button
                className="text-sm font-medium underline"
                onClick={() => openEditModal(selectedGuestIndex!)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      <EditAddGuestModal
        isOpen={isEditAddGuestModalOpen}
        action={modalAction}
        guest={modalAction === 'EDIT' && selectedGuestIndex !== null ? guests[selectedGuestIndex] : undefined}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default GuestSection;
