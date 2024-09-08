import React from "react"
import IconTitleDescription from "./IconTitleDescription"
import { T_HighlightsProps } from "../types/Highlights"

const Highlights = ({ highlights }: { highlights: T_HighlightsProps[] }) => {
  return (
    <>
      {highlights.map((highlight) => (
        <IconTitleDescription key={highlight.title} {...highlight} />
      ))}
    </>
  )
}

export default Highlights
