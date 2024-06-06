import React, { useState } from "react"
import { Typography } from "@/common/components/ui/Typography"
import DeactivateUserModal from "../components/modals/DeactivateUserModal"
import useSessionStore from "@/common/store/useSessionStore"

const DeactivateAccount = () => {
  const [deactivateUserModal, setDeactivateUserModal] = useState<boolean>(false)
  const userId = useSessionStore().id
  return (
    <>
      <div className="text-sm mt-2 border-b border-text-100">
        <div className="flex justify-between py-5">
          <div>
            <Typography variant="p">Deactivate your account</Typography>
          </div>
          <button
            onClick={() => setDeactivateUserModal(true)}
            className="text-error-500 underline self-start select-none"
          >
            Deactivate
          </button>
        </div>
      </div>
      <DeactivateUserModal
        userId={userId as string}
        isOpen={deactivateUserModal}
        onClose={() => setDeactivateUserModal(false)}
      />
    </>
  )
}

export default DeactivateAccount
