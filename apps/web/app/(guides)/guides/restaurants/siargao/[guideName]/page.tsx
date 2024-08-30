import { getGuideBlogs } from "@/common/helpers/getGuideBlogs"
import RestaurantGuide from "@/module/BlogGuide/Guide/RestaurantGuide"
import GlobalError from "@/module/Error/global-error"
import React from "react"

type T_Props = {
  params: {
    guideName: string
  }
}

const RestaurantGuidePage = async ({ params: { guideName } }: T_Props) => {
  const content = await getGuideBlogs(guideName, "restaurant")

  if (!content) {
    return <GlobalError />
  }

  return <RestaurantGuide data={content} />
}

export default RestaurantGuidePage
