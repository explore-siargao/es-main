import { APP_NAME } from "@repo/constants"
import { Typography } from "@/common/components/ui/Typography"
import { Button } from "@/common/components/ui/Button"

type FeedbackProps = {
  closeModal: () => void
}

const Feedback = ({ closeModal }: FeedbackProps) => {
  return (
    <>
      <div>
        <div className="pt-5 pb-10 px-5">
          <Typography variant="h2" fontWeight="semibold" className="mb-4">
            Thanks for your feedback
          </Typography>
          <Typography variant="p" className="mb-5">
            Thanks for giving us your feedback. We want to make {APP_NAME}{" "}
            better for you, and your input is an important part of that process.
          </Typography>
          <Typography variant="p">
            If you think this listing or host is unsafe, please contact us. If
            someone is in immediate danger, call local police or emergency
            services right away. We don’t monitor this inbox for emergency or
            urgent issues.
          </Typography>
        </div>
        <div className="justify-end border-t border-gray-300 flex items-center">
          <Button
            variant="default"
            className="mx-5 my-4 px-8"
            onClick={closeModal}
          >
            Ok
          </Button>
        </div>
      </div>
    </>
  )
}

export default Feedback
