import { getRequestCMS } from "@/common/helpers/getRequestCMS"
import SurfingGuide from "@/module/BlogGuide/Guide/SurfingGuide"
import { notFound } from "next/navigation"
import React from "react"

type T_Props = {
  params: {
    guideName: string
  }
}

const SurfingGuidePage = async ({ params: { guideName } }: T_Props) => {
  console.log("test: ", guideName)
  const content = await getRequestCMS(`/surfs/guide/${guideName}`)

  if (!content) {
    notFound()
  }

  return(
    <div>
    <SurfingGuide data={content}/>
  </div>
  ) 
}

export default SurfingGuidePage