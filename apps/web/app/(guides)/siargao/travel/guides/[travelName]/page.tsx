import { getRequestCMS } from "@/common/helpers/getRequestCMS"
import TravelBlog from "@/module/cms/guides/travel"
import { notFound } from "next/navigation"
import React from "react"

type T_Props = {
  params: {
    travelName: string
  }
}

const TravelGuidePage = async ({ params: { travelName } }: T_Props) => {
  const content = await getRequestCMS(`/travels/guide/${travelName}`)

  if (!content) {
    notFound()
  }

  return <TravelBlog data={content} />
}

export default TravelGuidePage
