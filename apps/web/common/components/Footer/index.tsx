"use client"
import Link from "next/link"
import { WidthWrapper } from "../WidthWrapper"
import { Typography } from "../ui/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons"
import { APP_NAME } from "@repo/constants"
import { SUPPORT, EXPLORE_SIARGAO, DESTINATION, PARTNER_WITH_US } from "./links"
import { Globe } from "lucide-react"

const Footer = ({
  contentWidth = "medium",
}: {
  readonly contentWidth?: "medium" | "small" | "wide" | "full"
}) => {
  return (
    <footer className="bg-gray-100 pb-6 pt-10 2xl:pt-16 bottom-0 border-t border-gray-200 mt-12">
      <WidthWrapper width={contentWidth}>
        <div className="md:flex border-b pb-4 md:pb-11">
          <div className="md:flex-1 pb-4 md:pb-0 md:mr-4 border-b md:border-b-0">
            <Typography
              variant="p"
              fontWeight="semibold"
              className="mb-2 text-sm"
            >
              Support
            </Typography>
            <ul>
              {SUPPORT.map((item, index) => (
                <li key={`${item.name}-${index}`}>
                  <Link href={item.link}>
                    <Typography
                      variant="p"
                      className="mb-1 hover:underline inline-block hover:duration-300 cursor-pointer text-sm text-text-500"
                    >
                      {item.name}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:flex-1 pb-4 pt-4 md:pt-0 md:pb-0 md:mr-4 border-b md:border-b-0">
            <Typography fontWeight="semibold" className="mb-2 text-sm">
              {APP_NAME}
            </Typography>
            <ul>
              {EXPLORE_SIARGAO.map((item) => (
                <li key={item.name}>
                  <Link href={item.link}>
                    <Typography className="mb-1 hover:underline inline-block hover:duration-300 cursor-pointer text-sm text-text-500">
                      {item.name}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:flex-1 pb-4 pt-4 md:pb-0 md:pt-0 md:mr-4 border-b md:border-b-0">
            <Typography className="font-semibold mb-2 text-sm">
              Destinations
            </Typography>
            <ul>
              {DESTINATION.map((item) => (
                <li key={item.name}>
                  <Link href={item.link}>
                    <Typography className="mb-1 hover:underline inline-block hover:duration-300 cursor-pointer text-sm text-text-500">
                      {item.name}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:flex-1 pt-4 md:pt-0 md:border-b-0">
            <Typography className="font-semibold mb-2 text-sm">
              Partner with us
            </Typography>
            <ul>
              {PARTNER_WITH_US.map((item) => (
                <li key={item.name}>
                  <Link href={item.link}>
                    <Typography className="mb-1 hover:underline inline-block hover:duration-300 cursor-pointer text-sm text-text-500">
                      {item.name}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="md:flex items-center mt-5 justify-between">
          <div className="flex gap-1">
            <Typography className="text-sm">&copy; 2024 {APP_NAME}</Typography>
            <Typography className="text-sm">&middot;</Typography>
            <Link
              href={""}
              className="mb-1 hover:underline hover:duration-300 cursor-pointer"
            >
              <Typography className="text-sm">Sitemap</Typography>
            </Link>{" "}
          </div>
          <div className="flex gap-2 md:items-center md:justify-center mt-2 md:mt-0">
            <Globe className="h-4 w-4" />
            <Typography className="text-sm">English (US)</Typography>
            <Typography fontWeight={"bold"} className="text-sm">
              &#8369;
            </Typography>
            <Typography className="hover:underline hover:duration-300 cursor-pointer text-sm">
              PHP
            </Typography>
            <Link href={"/"}>
              <FontAwesomeIcon
                icon={faFacebook}
                size="sm"
                className="hover:underline hover:duration-300 cursor-pointer"
              />
            </Link>
            <Link href={"/"}>
              <FontAwesomeIcon
                icon={faTwitter}
                size="sm"
                className="hover:underline hover:duration-300 cursor-pointer"
              />
            </Link>
            <Link href={"/"}>
              <FontAwesomeIcon
                icon={faInstagram}
                size="sm"
                className="hover:underline hover:duration-300 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </WidthWrapper>
    </footer>
  )
}

export default Footer
