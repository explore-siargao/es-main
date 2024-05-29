import { Button } from "@/common/components/ui/Button"
import { Input } from "@/common/components/ui/Input"
import React, { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { Typography } from "@/common/components/ui/Typography"
import { Select, Option } from "@/common/components/ui/Select"
import { COUNTRIES } from "@repo/constants"
import { T_Taxes } from "@repo/contract"
import useAddTax from "@/module/Listing/hooks/useAddTax"
import useSessionStore from "@/common/store/useSessionStore"
import useGetTaxByUser from "@/module/Listing/hooks/useGetTaxByUser"

type ContentStateProps = {
  isButtonClicked: boolean
  contentId: string
}

const Taxpayers = () => {
  const session = useSessionStore((state) => state)
  const [contentState, setContentState] = useState<ContentStateProps>({
    isButtonClicked: false,
    contentId: "",
  })
  const { data, isLoading } = useGetTaxByUser(session.id as number)
  const { register, reset, handleSubmit } = useForm<T_Taxes>({
    values: data?.item,
  })
  const { mutate, isPending } = useAddTax()
  const queryClient = useQueryClient()

  const onSubmit = (formData: T_Taxes) => {
    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["tax", session.id],
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
    mutate({ ...formData, userId: session.id as number }, callBackReq)
  }

  return (
    <div className="text-sm border-b border-text-50">
      {!contentState.isButtonClicked ? (
        <div className="flex justify-between pt-5 pb-8">
          <div>
            <Typography variant={"p"}>Value Added Tax (VAT)</Typography>
            <Typography fontWeight={"light"}>
              If you are VAT-registered, please add your VAT ID.
            </Typography>
          </div>
          <button
            onClick={() =>
              setContentState({
                isButtonClicked: !contentState.isButtonClicked,
                contentId: "legalName",
              })
            }
            className="underline self-start select-none "
          >
            Edit
          </button>
        </div>
      ) : (
        <div className="grid pt-5 pb-8">
          <div className="flex justify-between">
            <Typography variant={"p"}>Value Added Tax (VAT)</Typography>
            <button
              className="underline self-start select-none "
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
          <Typography fontWeight={"light"}>
            If you are VAT-registered, please add your VAT ID.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 my-4">
              <Select
                {...register("countryRegion")}
                label="Country"
                disabled={isLoading || isPending}
                required
              >
                <Option value="">Select Country</Option>
                {COUNTRIES.map((country) => (
                  <Option key={country.code} value={country.code}>
                    {country.name}
                  </Option>
                ))}
              </Select>
              <Input
                id="vatId"
                label="VAT ID Number"
                {...register("vatId")}
                disabled={isLoading || isPending}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
              <Input
                id="nameOnReg"
                label="Name on Registration"
                {...register("nameOnRegistration")}
                disabled={isLoading || isPending}
                required
              />
              <Input
                id="addressLine1"
                label="Address line 1"
                {...register("addressLine1")}
                disabled={isLoading || isPending}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
              <Input
                id="addressLine2"
                label="Address line 2"
                {...register("addressLine2")}
                disabled={isLoading || isPending}
              />
              <Input
                id="city"
                label="City"
                {...register("city")}
                disabled={isLoading || isPending}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
              <Input
                id="province"
                label="Province"
                {...register("provinceRegion")}
                disabled={isLoading || isPending}
                required
              />
              <Input
                id="zip"
                label="Zip/postal code"
                {...register("zipPostalCode")}
                disabled={isLoading || isPending}
                required
              />
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

export default Taxpayers
