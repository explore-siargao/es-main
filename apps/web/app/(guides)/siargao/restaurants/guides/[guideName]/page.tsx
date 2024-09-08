import { getRequestCMS } from "@/common/helpers/getRequestCMS"
import RestaurantGuide from "@/module/BlogGuide/Guide/RestaurantGuide"
import { notFound } from "next/navigation"
import React from "react"

type T_Props = {
  params: {
    guideName: string
  }
}

const RestaurantGuidePage = async ({ params: { guideName } }: T_Props) => {
  const content = await getRequestCMS(`/restaurants/guide/${guideName}`)

  if (!content) {
    notFound()
  }

  return <RestaurantGuide data={content} />
}

export default RestaurantGuidePage
