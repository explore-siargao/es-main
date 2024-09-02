"use client"
import serialize from "@/common/components/RichText/serialize"
import { Spinner } from "@/common/components/ui/Spinner"
import { Typography } from "@/common/components/ui/Typography"
import { WidthWrapper } from "@/common/components/WidthWrapper"
import { WEB_URL } from "@/common/constants/ev"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const Legal = () => {
  const params = useParams()
  const legalName = params["legal-name-from-cms"]

  const [legalData, setLegalData] = useState<any>([])
  const [legalDataLoading, setLegalDataLoading] = useState(true)

  const getLegalData = async () => {
    try {
      const res = await fetch(`${WEB_URL}/cms/api/legals/about/${legalName}`)

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`)
      }

      const data = await res.json()
      setLegalData(data.docs[0])
      setLegalDataLoading(false)
    } catch (err) {
      console.log(err)
      setLegalDataLoading(false)
    }
  }

  useEffect(() => {
    getLegalData()
  }, [])
  return (
    <WidthWrapper width="medium" className="mt-[163px]">
      {legalDataLoading ? (
        <Spinner variant="primary" middle />
      ) : legalData ? (
        <div className="prose max-w-full">
          {serialize(legalData.mainContent)}
        </div>
      ) : (
        <Typography>No data was found</Typography>
      )}
    </WidthWrapper>
  )
}

export default Legal
