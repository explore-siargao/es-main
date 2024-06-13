import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import useAddAddress from "../hooks/useAddAddress"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Typography } from "@/common/components/ui/Typography"
import { T_AddUpdateAddress, T_Address } from "@repo/contract"
import { Option, Select } from "@/common/components/ui/Select"
import { COUNTRIES } from "@repo/constants"

type PersonalInfoProps = {
  isButtonClicked: boolean
  contentId: string
}
const Address = ({
  streetAddress,
  country,
  city,
  stateProvince,
  zipCode,
  aptSuite,
  personalInfoId,
}: T_Address) => {
  const [contentState, setContentState] = useState<PersonalInfoProps>({
    isButtonClicked: false,
    contentId: "",
  })
  const { register, reset, handleSubmit, getValues } =
    useForm<T_AddUpdateAddress>({
      values: {
        streetAddress,
        country,
        city,
        stateProvince,
        zipCode,
        aptSuite,
      },
    })
  const { mutate, isPending } = useAddAddress(personalInfoId)
  const queryClient = useQueryClient()

  const onSubmit = (formData: T_AddUpdateAddress) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["session"],
          })
          toast.success(data.message)
          reset()
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }
    mutate({ ...formData, zipCode: Number(getValues("zipCode")) }, callBackReq)
  }

  return (
    <div className="text-sm">
      {!contentState.isButtonClicked ? (
        <div className="flex justify-between py-5">
          <div>
            <Typography variant={"p"}>Address</Typography>
            <Typography className="font-light">
              {zipCode
                ? `${streetAddress} ${city}, ${stateProvince}, ${country}`
                : "Enter an Address"}
            </Typography>
          </div>
          <button
            onClick={() =>
              setContentState({
                isButtonClicked: !contentState.isButtonClicked,
                contentId: "Address",
              })
            }
            className="underline self-start select-none"
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="grid py-5">
          <div className="flex justify-between">
            <Typography variant={"p"}>Address</Typography>
            <button
              className="underline self-start select-none"
              onClick={() =>
                setContentState({
                  isButtonClicked: !contentState.isButtonClicked,
                  contentId: " ",
                })
              }
            >
              Cancel
            </button>
          </div>
          <Typography className="font-light">
            Use a permanent address where you can receive mail.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Select
                  {...register("country", {
                    required: "This field is required",
                  })}
                  label="Country"
                  disabled={isPending}
                  required
                  className="col-span-1"
                >
                  <Option value={""}>Select Country</Option>
                  {COUNTRIES.map((country) => (
                    <Option key={country.code} value={country.code}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
                <Input
                  id="streetAddress"
                  label="Street address"
                  disabled={isPending}
                  {...register("streetAddress", {
                    required: "This field is required",
                  })}
                  required
                />
                <Input
                  id="streetAddress"
                  label="Apt Suite"
                  disabled={isPending}
                  {...register("aptSuite")}
                />
                <Input
                  id="city"
                  label="City"
                  disabled={isPending}
                  defaultValue={city}
                  {...register("city", {
                    required: "This field is required",
                  })}
                  required
                />
                <Input
                  id="stateProvince"
                  disabled={isPending}
                  label="State/Province"
                  {...register("stateProvince", {
                    required: "This field is required",
                  })}
                  required
                />
                <Input
                  id="zipCode"
                  type="number"
                  label="Zip code"
                  disabled={isPending}
                  defaultValue={zipCode}
                  {...register("zipCode", {
                    required: "This field is required",
                  })}
                  required
                />
              </div>
            </div>
            <Button className="w-20" size={"sm"} type="submit">
              {isPending ? (
                <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent text-primary-200 rounded-full">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Address
