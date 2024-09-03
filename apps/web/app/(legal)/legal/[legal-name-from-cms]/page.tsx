import { getRequestCMS } from "@/common/helpers/getRequestCMS"
import Legal from "@/module/Legal"
import { notFound } from "next/navigation"
import React from "react"

type T_Props = {
  params: {
    "legal-name-from-cms": string
  }
}

const LegalPage = async ({ params }: T_Props) => {
  const legalName = params["legal-name-from-cms"]
  const content = await getRequestCMS(`/legals/about/${legalName}`)

  if (!content) {
    notFound()
  }

  return <Legal data={content} />
}

export default LegalPage
