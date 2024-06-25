"use client"
import { Typography } from "@/common/components/ui/Typography"
import React, { useState } from "react"
import { TitleSection } from "./TitleSection"
import { Button } from "@/common/components/ui/Button"

interface WhereYouWillBe {
  title: string
}

const WhereYouWillBe: React.FC<WhereYouWillBe> = ({ title }) => {
  const firstDesc =
    "Mantaray Siargao is located in Purok 1, General Luna. A quiet residential area close to the heart of town. The property is nestled between the beach and the main road, allowing guests like you to easily drive or hail a tricycle to town."
  const secondDesc =
    "It's best to get around the neighborhood by renting a motorcycle. We have parking space that can accommodate both motorcycles and four wheels. If driving is not your thing during your vacation, tricycles/tuktuks ply the main road frequently, so you should be able to find a ride to town fairly easily."

  const maxLength = 100

  const useToggle = (initialState: boolean): [boolean, () => void] => {
    const [state, setState] = useState<boolean>(initialState)
    const toggle = () => setState(!state)
    return [state, toggle]
  }

  const [readMore, setToggleReadMore] = useToggle(false)
  const [secondReadMore, setToggleSecondReadMore] = useToggle(false)

  return (
    <div>
      <Typography fontWeight="semibold" className="text-3xl px-4 mb-5">
        Where You'll be
      </Typography>
      <div className="container px-4">
        <TitleSection
          title={title}
          className="text-xl font-semibold mb-4"
        ></TitleSection>
      </div>
      <div className="px-4">
        {readMore ? (
          <Typography variant="p" fontWeight="normal">
            {firstDesc}
          </Typography>
        ) : (
          <Typography variant="p" fontWeight="normal">{`${firstDesc.slice(
            0,
            maxLength
          )}...`}</Typography>
        )}
      </div>
      <Button
        className="text-sm font-semibold underline mb-4"
        variant={"ghost"}
        onClick={setToggleReadMore}
      >
        {readMore ? "Read Less" : "Read more >"}
      </Button>
      <div className="container px-4 mb-5">
        <TitleSection
          title="Getting Around"
          className="text-xl font-semibold mb-4"
        />
      </div>
      <div className="px-4">
        {secondReadMore ? (
          <Typography variant="p">{secondDesc}</Typography>
        ) : (
          <Typography variant="p">{`${secondDesc.slice(
            0,
            maxLength
          )}...`}</Typography>
        )}
      </div>
      <Button
        className="text-sm font-semibold underline mb-4"
        variant={"ghost"}
        onClick={setToggleSecondReadMore}
      >
        {secondReadMore ? "Read Less" : "Read more >"}
      </Button>
    </div>
  )
}

export default WhereYouWillBe
