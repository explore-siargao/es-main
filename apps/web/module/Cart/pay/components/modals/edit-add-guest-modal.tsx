import ModalContainer from "@/common/components/ModalContainer";
import React, { useState, useEffect } from "react";
import { Input } from "@/common/components/ui/Input";
import { Button } from "@/common/components/ui/Button";

interface Guest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

interface EditAddGuestModalProps {
  isOpen: boolean;
  action: "EDIT" | "ADD";
  guest?: Guest;
  onSubmit: (guest: Guest) => void;
}

const EditAddGuestModal = ({ isOpen, action, guest, onSubmit }: EditAddGuestModalProps) => {
  const [formData, setFormData] = useState<Guest>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    if (action === 'EDIT' && guest) {
      setFormData(guest);
    } else if (action === 'ADD') {
      setFormData({ firstName: '', lastName: '', phoneNumber: '', email: '' });
    }
  }, [action, guest]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <ModalContainer isOpen={isOpen} size="auto" title={action === 'EDIT' ? 'Edit Guest Information' : 'Add Guest'}>
      <div className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border-gray-300"
              label="First name"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border-gray-300"
              label="Last name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border-gray-300"
            label="Phone number"
          />
        </div>
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-300"
            label="Email (for updates on your booking)"
          />
        </div>
        <div className="flex justify-end">
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            Confirm
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default EditAddGuestModal;
