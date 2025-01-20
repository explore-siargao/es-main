import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import { FACEBOOK_CLIENT_ID, WEB_URL } from "@/common/constants/ev"
import {
  LucideCopy,
  LucideFacebook,
  LucideMail,
  LucideMessageCircle,
  LucideMessageCircleReply,
  LucideMessageSquareCode,
  LucideTwitter,
} from "lucide-react"
import toast from "react-hot-toast"

interface SharePlaceModalProps {
  isOpen: boolean
  onClose: () => void
}
const SharePlaceModal = ({ isOpen, onClose }: SharePlaceModalProps) => {
  const currentLink = window.location.href
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Share this place"
      size="sm"
    >
      <div className="px-5 py-2">
        <div className="flex flex-col md:flex-row gap-4 pb-4">
          <div className="flex-1 md:w-1/2 2xl:w-full">
            <div className="mt-4">
              <Button
                size={"lg"}
                variant={"shaded"}
                className="py-8 w-full space-x-2 pl-5 justify-start"
                onClick={() => {
                  toast.success("Link copied")
                  navigator.clipboard.writeText(currentLink)
                }}
              >
                <LucideCopy size={"30px"} />
                <Typography fontWeight={"semibold"}>Copy Link</Typography>
              </Button>
            </div>
            <div className="mt-4">
              <Button
                size={"lg"}
                variant={"shaded"}
                className="py-8  w-full space-x-2 pl-5 justify-start"
              >
                <LucideMessageCircle size={"30px"} />
                <Typography fontWeight={"semibold"}>Messages</Typography>
              </Button>
            </div>
            <div className="mt-4">
              <Button
                size={"lg"}
                variant={"shaded"}
                className="py-8  w-full space-x-2 pl-5 justify-start"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/dialog/send?app_id=${FACEBOOK_CLIENT_ID}&link=${encodeURIComponent(currentLink)}&redirect_uri=${encodeURIComponent(WEB_URL)}`,
                    "_blank"
                  )
                }
              >
                <LucideMessageCircleReply size={"30px"} />
                <Typography fontWeight={"semibold"}>Messenger</Typography>
              </Button>
            </div>
            <div className="mt-4">
              <Button
                size={"lg"}
                variant={"shaded"}
                className="py-8  w-full space-x-2 pl-5 justify-start"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/post?url=${encodeURIComponent(currentLink)}`,
                    "_blank"
                  )
                }
              >
                <LucideTwitter size={"30px"} />
                <Typography fontWeight={"semibold"}>Twitter</Typography>
              </Button>
            </div>
          </div>
          <div className="flex-1 md:w-1/2 2xl:w-full">
            <div className="mt-4">
              <Button
                size={"lg"}
                variant={"shaded"}
                className="py-8  w-full space-x-2 pl-5 justify-start"
                onClick={() =>
                  (window.location.href = `mailto:?subject=${encodeURIComponent("ExploreSiargao Listing")}&body=${currentLink}`)
                }
              >
                <LucideMail size={"30px"} />
                <Typography fontWeight={"semibold"}>Email</Typography>
              </Button>
            </div>
            <div className="mt-4">
              <Button
                size={"lg"}
                variant={"shaded"}
                className="py-8  w-full space-x-2 pl-5 justify-start"
                onClick={() =>
                  window.open(`https://wa.me/?text=${currentLink}`, "_blank")
                }
              >
                <LucideMessageSquareCode size={"30px"} />
                <Typography fontWeight={"semibold"}>WhatsApp</Typography>
              </Button>
            </div>
            <div className="mt-4">
              <Button
                size={"lg"}
                variant={"shaded"}
                className="py-8  w-full space-x-2 pl-5 justify-start"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer.php?u=${currentLink}`,
                    "_blank"
                  )
                }
              >
                <LucideFacebook size={"30px"} />
                <Typography fontWeight={"semibold"}>Facebook</Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  )
}

export default SharePlaceModal
