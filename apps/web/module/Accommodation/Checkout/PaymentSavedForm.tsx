import { Input } from "@/common/components/ui/Input"
import { Typography } from "@/common/components/ui/Typography"
import ErrorMessage from "@/module/AccountSettings/PaymentPayout/ErrorMessage"
import Link from "next/link"
import valid from "card-validator"
import { useForm } from "react-hook-form"
import usePaymentInfoStore from "./store/usePaymentInfoStore"

const PaymentSavedForm = () => {
  const updatePaymentInfo = usePaymentInfoStore(
    (state) => state.updatePaymentInfo
  )

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<any>()

  const validateCvv = () => {
    const checkCvv = valid.cvv(getValues("cvv"))
    if (checkCvv.isValid) {
      clearErrors("cvv")
    } else {
      setError("cvv", {
        type: "manual",
        message: "Invalid cvv number",
      })
    }
  }

  return (
    <div>
      <ErrorMessage
        title="Please check the following errors"
        errors={[
          ...(errors.cvv === undefined ? [] : [errors.cvv.message as string]),
        ]}
      />
      <div className="grid grid-cols-2 mb-2">
        <Input
          label="CVV"
          id="cvv"
          type="number"
          placeholder="123"
          // disabled={isPending}
          {...register("cvv", {
            minLength: 3,
            maxLength: 3,
            required: "This field is required",
            onChange: (e) => {
              validateCvv()
              updatePaymentInfo({ key: "cvv", value: e.target.value })
            },
          })}
          required
        />
      </div>
      <div>
        <Typography className="text-sm text-text-300">
          Your card information will be encrypted while in transit to our server
          and will be stored securely. If you want to know more about how we do
          it, you can go to this{" "}
          <Link
            href="https://listings.pcisecuritystandards.org/pdfs/pci_fs_data_storage.pdf"
            className="underline text-primary-700 hover:text-text-500"
            target="_blank"
          >
            link
          </Link>
          .
        </Typography>
      </div>
    </div>
  )
}

export default PaymentSavedForm
