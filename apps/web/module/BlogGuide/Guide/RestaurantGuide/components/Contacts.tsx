import { T_SocialMediaProps } from "../types/Contacts"
import { TitleSection } from "@/module/Accommodation/components/TitleSection"
import IconDescription from "@/module/Listing/Rental/components/IconDescription"
import Link from "next/link"

const SocialMediaContacts = ({ contacts }: T_SocialMediaProps) => {
  return (
    <>
      <TitleSection size="lg" title="Social Media Contacts">
        <div className="mb-5"></div>
        <div className="grid grid-cols-2">
          {contacts.map((item) => (
            <Link
              href={item.link}
              target="_blank"
              className="hover:underline hover:underline-offset-4"
            >
              <IconDescription {...item} />
            </Link>
          ))}
        </div>
      </TitleSection>
    </>
  )
}

export default SocialMediaContacts
