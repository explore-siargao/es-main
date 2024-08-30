"use client"
import serialize from "@/common/components/RichText/serialize"
import { WidthWrapper } from "@/common/components/WidthWrapper"

type T_Prop = {
  data: any
}
const Legal = ({ data }: T_Prop) => {
  return (
    <WidthWrapper width="medium" className="mt-[163px]">
      <div className="prose max-w-full">{serialize(data.mainContent)}</div>
    </WidthWrapper>
  )
}

export default Legal
