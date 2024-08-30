import { getGuideBlogs } from "@/common/helpers/getGuideBlogs"
import TravelBlog from "@/module/BlogGuide/Guide/TravelBlog"
import GlobalError from "@/module/Error/global-error"
import React from "react"

type T_Props = {
  params: {
    travelName: string
  }
}

const TravelGuidePage = async ({ params: { travelName } }: T_Props) => {
  const content = await getGuideBlogs(travelName, "location")

  if (!content) {
    return <GlobalError />
  }

  return <TravelBlog data={content} />
}

export default TravelGuidePage
