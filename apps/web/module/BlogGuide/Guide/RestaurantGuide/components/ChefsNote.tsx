"use client"
import React from "react"
import { Typography } from "@/common/components/ui/Typography"

const ChefsNote = () => {
  return (
    <div className="my-14">
      <Typography variant="h1" fontWeight="semibold">
        Chef's Note
      </Typography>
      <div className="divide-y">
        <div className="py-4">
          <Typography variant="h4">
            As the head chef, I take great pride in crafting each dish with the
            freshest, locally-sourced ingredients. Our menu is designed to offer
            a diverse range of flavors that cater to various dietary
            preferences, ensuring there's something for everyone to enjoy. I am
            particularly passionate about creating innovative vegetarian and
            vegan options that are both nutritious and delicious. Thank you for
            dining with us, and I hope you have a memorable culinary experience.
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default ChefsNote
