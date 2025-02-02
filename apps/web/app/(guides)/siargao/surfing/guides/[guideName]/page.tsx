import { getRequestCMS } from "@/common/helpers/getRequestCMS"
import SurfingGuide from "@/module/cms/guides/surfing"
import { notFound } from "next/navigation"
import React from "react"

type T_Props = {
  params: {
    guideName: string
  }
}

const SurfingGuidePage = async ({ params: { guideName } }: T_Props) => {
  const content = await getRequestCMS(`/surfs/guide/${guideName}`)
  if (!content) {
    notFound()
  }

  return <SurfingGuide data={content} />
}

export default SurfingGuidePage
