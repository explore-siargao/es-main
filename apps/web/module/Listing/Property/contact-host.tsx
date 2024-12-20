import { Button } from "@/common/components/ui/Button"
import { Textarea } from "@/common/components/ui/Textarea"
import { Typography } from "@/common/components/ui/Typography"
import Image from "@/common/components/ui/image"

interface ContactHostProps {
  hostName: string
  listingName: string
}

const ContactHost = ({ hostName, listingName }: ContactHostProps) => {
  return (
    <div>
      <div className="flex pb-6 border-b justify-between">
        <div>
          <Typography variant="h1">Contact {hostName}</Typography>
          <Typography className="text-gray-400">{listingName}</Typography>
        </div>
        <div>
          <div className={`rounded-full h-16 w-16`}>
            <Image
              src={`/assets/2.jpg`}
              width={100}
              height={100}
              alt="Avatar"
              className="object-cover h-full w-full rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="py-6">
        <Typography variant="h2">Message the Host</Typography>
        <Textarea className="h-40 my-6 focus:border-primary-700 focus:border-3 focus:ring-primary-700" />
        <Button variant="outline">Send Message</Button>
      </div>
    </div>
  )
}

export default ContactHost
