import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { Typography } from "@/common/components/ui/Typography"
import { Input } from "@/common/components/ui/Input"
import { Textarea } from "@/common/components/ui/Textarea"

interface IMessageProps {
  imageKey: string
  message: string
  timeSent: string
  isSender: boolean
  isSeen: boolean
}

interface MessageProps {
  messages: IMessageProps[]
}

const MessageConversation = ({ messages }: MessageProps) => {
  // const messageEndRef = useRef<HTMLDivElement>(null)

  // const scrollToBottom = () => {
  //   if (messageEndRef.current) {
  //     messageEndRef.current.scrollIntoView({ behavior: "smooth" })
  //   }
  // }

  // useEffect(() => {
  //   scrollToBottom()
  // }, [messages])

  return (
    <div className="h-screen relative">
      <div className="p-4">
        {messages.map((item) => (
          <>
            {item.isSender === false && (
              <div className="flex" key={item.timeSent}>
                <div className="flex-none w-14">
                  <Image
                    src={`/assets/${item.imageKey}`}
                    width={50}
                    height={50}
                    alt="Profile image"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="w-1/2">
                    <Typography
                      variant="p"
                      className="bg-secondary-600 md:rounded-xl text-white py-2 px-3 rounded-xl inline-block"
                    >
                      {item.message}
                    </Typography>
                  </div>
                  <Typography
                    variant="h6"
                    className="text-gray-400 pt-2 right-0"
                  >
                    {format(new Date(item.timeSent), "hh:mm a")}
                  </Typography>
                </div>
              </div>
            )}

            {item.isSender === true && (
              <div className="flex justify-end mb-4">
                <div className="w-1/2 flex flex-row-reverse pr-2">
                  <div className="flex flex-col">
                    <Typography
                      variant="p"
                      className="bg-primary-600 md:rounded-xl text-white py-2 px-3 rounded-xl inline-block"
                    >
                      {item.message}
                    </Typography>
                    <Typography
                      variant="h6"
                      className="text-gray-400 pt-2 ml-auto"
                    >
                      {format(new Date(item.timeSent), "hh:mm a")}
                    </Typography>
                  </div>
                </div>

                <div className="flex-none justify-end place-content-end ">
                  <div className="relative">
                    {item.isSeen === true && (
                      <Image
                        src={`/assets/${item.imageKey}`}
                        width={50}
                        height={50}
                        alt="Profile image"
                        className="w-5 h-5 object-cover rounded-full"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
        {/* <div ref={messageEndRef} /> */}
      </div>
      <div className="p-4 w-full">
        <Textarea className="focus:border-primary-700 focus:border-3 focus:ring-primary-700" />
      </div>
    </div>
  )
}

export default MessageConversation
