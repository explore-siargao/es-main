import { getGuideBlogs } from "@/common/helpers/getGuideBlogs"
import GlobalError from "@/module/Error/global-error"
import Legal from "@/module/Legal"
import React from "react"

type T_Props = {
  params: {
    "legal-name-from-cms": string
  }
}

const LegalPage = async ({ params }: T_Props) => {
  const legalName = params["legal-name-from-cms"]
  const content = await getGuideBlogs(legalName, "legal")

  if (!content) {
    return <GlobalError />
  }

  return <Legal data={content} />
}

export default LegalPage
