import ModalContainer from "@/common/components/ModalContainer"
import { Button } from "@/common/components/ui/Button"
import { Typography } from "@/common/components/ui/Typography"
import {
  LucideCopy,
  LucideFacebook,
  LucideMail,
  LucideMessageCircle,
  LucideMessageCircleReply,
  LucideMessageSquareCode,
  LucideTwitter,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface SharePlaceModalProps {
  isOpen: boolean
  onClose: () => void
}
const SharePlaceModal = ({ isOpen, onClose }: SharePlaceModalProps) => {
  const router = useRouter()
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Share this place"
      size="sm"
    >
      <div className="px-12 py-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-8 pb-12">
          <div className="flex-1 md:w-1/2 2xl:w-full">
            <div className="mt-4">
              <Button
                size={"lg"}
                variant={"shaded"}
                className="py-8  w-full space-x-2 pl-5 justify-start"
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
                onClick={() => (window.location.href = "sms:09760624830")}
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
                  router.push(
                    "https://www.facebook.com/dialog/send?app_id=138566025676&link=https%3A%2F%2Fwww.airbnb.com%2Frooms%2F37250886%3Fcheck_in%3D2024-03-16%26check_out%3D2024-03-21%26guests%3D1%26adults%3D1%26s%3D25%26unique_share_id%3D77e2b1e9-f625-466f-a85f-864d355f4e70&redirect_uri=https%3A%2F%2Fwww.airbnb.com%2Frooms%2F37250886%3Fcheck_in%3D2024-03-16%26check_out%3D2024-03-21%26guests%3D1%26adults%3D1%26s%3D25%26unique_share_id%3D77e2b1e9-f625-466f-a85f-864d355f4e70"
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
                  router.push(
                    "https://twitter.com/intent/post?source=tweetbutton&text=&url=https%3A%2F%2Fwww.airbnb.com%2Frooms%2F37250886%3Fcheck_in%3D2024-03-16%26check_out%3D2024-03-21%26guests%3D1%26adults%3D1%26s%3D5%26unique_share_id%3D4657d164-902d-4b35-90b2-4e0e445ba0de&related=airbnb"
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
                  (window.location.href =
                    "mailto:recipient@example.com?subject=Hello&body=How are you?")
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
                onClick={() => router.push("https://web.whatsapp.com/")}
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
                  router.push(
                    "https://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.airbnb.com%2Frooms%2F37250886%3Fcheck_in%3D2024-03-16%26check_out%3D2024-03-21%26guests%3D1%26adults%3D1%26s%3D4%26unique_share_id%3D807225a8-4974-467c-b64c-d2ed55be78e2&quote="
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
