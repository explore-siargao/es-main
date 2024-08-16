import ModalContainer from "@/common/components/ModalContainer"
import { Typography } from "@/common/components/ui/Typography"
import Image from "next/image"

type T_MenuModalProps = {
  isOpen: boolean
  onClose: () => void
  menus: any
}
const MenuModal = ({ isOpen, onClose, menus }: T_MenuModalProps) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} size="md" title="Menu">
      <div className="px-12 pb-6">
        <div className="mt-4 space-y-6">
          {menus ? (
            menus.map((item: any, index: number) => (
              <Image
                key={"menu-image-" + index}
                src={item.menu.url}
                alt={item.menu.alt}
                width={1200}
                height={1200}
              />
            ))
          ) : (
            <Typography>
              There is no available menu to display. The author might haven't
              set the menu.
            </Typography>
          )}
        </div>
      </div>
    </ModalContainer>
  )
}

export default MenuModal
