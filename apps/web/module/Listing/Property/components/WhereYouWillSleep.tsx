import { Typography } from "@/common/components/ui/Typography"
import { ChevronRight, BedDouble, BedSingle } from "lucide-react"
import Image from "next/image"

interface Props {
  isIcon: boolean
  items: [
    {
      title: string
      description: string
      fileKey: string | null
    },
  ]
}

const WhereYouWillSleep = ({ isIcon, items }: Props) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Typography variant="h2" fontWeight="bold">
          Where you'll sleep
        </Typography>
        {!isIcon && (
          <div className="flex items-center">
            <Typography variant="h5">1 / 2</Typography>
            <button className="shadow-sm shadow-gray-400 rounded-full p-2 mb-1.5 ml-12">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      <div
        className={`grid ${isIcon ? "grid-cols-2 md:grid-cols-3" : "md:grid-cols-2"} gap-4 mt-4`}
      >
        {items.map((data) => {
          return (
            <>
              {isIcon ? (
                <div className="border rounded-md p-4">
                  <div className="flex space-x-1 mb-4">
                    <BedDouble className="h-6 w-6" strokeWidth={1.2} />
                    <BedSingle className="h-6 w-6" strokeWidth={1.2} />
                  </div>
                  <Typography variant="h4" fontWeight="bold" className="mb-1">
                    {data.title}
                  </Typography>
                  <Typography variant="h5">{data.description}</Typography>
                </div>
              ) : (
                <div>
                  <div className="relative h-56 bg-gray-200 rounded-md mb-3">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg/1200px-Imperial_Hotel_Osaka_regular_floor_standard_twin_room_20120630-001.jpg"
                      layout="fill"
                      objectFit="cover"
                      alt=""
                      className="rounded-md"
                    />
                  </div>
                  <Typography variant="h4" fontWeight="bold" className="mb-1">
                    {data.title}
                  </Typography>
                  <Typography variant="h5">{data.description}</Typography>
                </div>
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default WhereYouWillSleep
