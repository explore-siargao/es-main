import React from "react"
import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import { APP_NAME } from "@repo/constants"

const Gift = () => {
  return (
    <div className="grid grid-cols-2 ">
      <div className="grid bg-primary-50 h-screen py-40 justify-items-center">
        <div className="flex h-[300px] w-[500px] rounded-xl shadow-2xl bg-primary-700 self-center justify-center align-middle">
          <Typography variant={"p"} className="text-white text-5xl my-auto">
            Logo
          </Typography>
        </div>
      </div>
      <div className="grid self-center justify-center align-middle">
        <Typography className="text-5xl font-semibold mb-10" variant={"p"}>
          Let's redeem your gift <br /> card
        </Typography>
        <div className="space-y-5">
          <Input id="pin" label="Pin" />
          <Typography variant={"p"}>
            By redeeming, you agree to the {APP_NAME} Gift Card Terms.
          </Typography>
          <Button variant={"primary"} className="w-full">
            Redeem gift card
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Gift
