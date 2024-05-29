import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"

interface Chats {
  title: string
  message: string
  badge: BadgeType
  isSelected?: boolean
}

export enum BadgeType {
  AsGuest = "As Guest",
  AsHost = "As Host",
}

interface ChatProps {
  chats: Chats[]
}

const ChatSidebar = ({ chats }: ChatProps) => {
  return (
    <div className="bg-white">
      <ul className="divide-y">
        {chats.map((item) => (
          <li
            key={item.title}
            className={`hover:bg-primary-200 ${item.isSelected ? "bg-primary-100" : ""}`}
          >
            <Link
              href="/conversation"
              passHref={true}
              className="text-gray-600 hover:text-black  group flex rounded-md text-sm font-semibold justify-between p-4"
            >
              <div className="h-12 overflow-hidden">
                <Typography
                  variant="h3"
                  fontWeight="semibold"
                  className="truncate"
                >
                  {item.title}
                </Typography>
                <Typography className="text-sm truncate">
                  {item.message}
                </Typography>
              </div>
              <div>
                <span
                  className={`ml-2 justify-center inline-flex items-center rounded-md px-2 py-1  
                        ring-1 ring-inset ring-black/10 w-12 h-5 whitespace-nowrap ${
                          item.badge === BadgeType.AsHost
                            ? "bg-primary-500"
                            : "bg-secondary-500"
                        }`}
                >
                  <Typography className="text-[10px]" fontWeight="semibold">
                    {item.badge}
                  </Typography>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChatSidebar
