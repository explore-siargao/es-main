import { getGuideBlogs } from "@/common/helpers/getGuideBlogs"
import SurfingGuide from "@/module/BlogGuide/Guide/SurfingGuide"
import GlobalError from "@/module/Error/global-error"
import React from "react"

type T_Props = {
  params: {
    guideName: string
  }
}

const SurfingGuidePage = async ({ params: { guideName } }: T_Props) => {
  const content = await getGuideBlogs(guideName, "surf")

  if (!content) {
    return <GlobalError />
  }

  return <SurfingGuide data={content} />
}

export default SurfingGuidePage
