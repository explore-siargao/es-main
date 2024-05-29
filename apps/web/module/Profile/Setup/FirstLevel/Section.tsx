import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import React, { useState } from "react"
import { T_ModalContent } from "."
import useProfileEditStore from "../store/useProfileEditStore"

type T_Section = {
  name: string
  modalContent: ({ setIsOpen }: T_ModalContent) => React.ReactNode
  title: string
  icon: React.ReactNode
}

const Section = ({ name, modalContent, icon, title }: T_Section) => {
  // @ts-expect-error
  const sectionValue = useProfileEditStore((state) => state[name])
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <div className="border-b relative">
        <button
          key={title}
          className="flex items-center pt-5 pb-5 px-4 gap-4 rounded-xl hover:bg-primary-100 h-full cursor-pointer"
          onClick={() => setModalOpen(!modalOpen)}
          onKeyDown={() => setModalOpen(!modalOpen)}
        >
          <div className="w-8">{icon}</div>
          <div>
            <Typography className="text-gray-500 text-left">
              {title}
              {sectionValue ? `: ${sectionValue}` : ""}
            </Typography>
          </div>
        </button>
      </div>

      <ModalContainer
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        size="sm"
      >
        {modalContent({ setIsOpen: setModalOpen })}
      </ModalContainer>
    </>
  )
}

export default Section
