"use client"
import React from "react"
import { Input } from "@/common/components/ui/Input"
import amex from "@/common/assets/amex.png"
import discover from "@/common/assets/discover-card.png"
import mastercard from "@/common/assets/mastercard.png"
import visa from "@/common/assets/visa.png"
import Image from "@/common/components/ui/image"
import { useForm } from "react-hook-form"
import valid from "card-validator"
import { Option, Select } from "@/common/components/ui/Select"
import { COUNTRIES } from "@repo/constants"
import ErrorMessage from "@/module/AccountSettings/PaymentPayout/ErrorMessage"
import { Typography } from "@/common/components/ui/Typography"
import Link from "next/link"
import { T_CardInfo } from "@repo/contract"
import usePaymentInfoStore from "./store/usePaymentInfoStore"

const PaymentMethodForm = () => {
  const updatePaymentInfo = usePaymentInfoStore(
    (state) => state.updatePaymentInfo
  )
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<T_CardInfo & { expirationDate: string }>()
  const validateCard = () => {
    const validateNumber = valid.number(getValues("cardNumber"))
    if (validateNumber.card) {
      clearErrors("cardNumber")
      if (validateNumber.isValid) {
        clearErrors("cardNumber")
      } else {
        setError("cardNumber", {
          type: "manual",
          message: "Invalid card number",
        })
      }
    } else {
      setError("cardNumber", {
        type: "manual",
        message: "Invalid Card",
      })
    }
  }

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

  const validateExpirationDate = () => {
    const checkExpirationDate = valid.expirationDate(
      getValues("expirationDate")
    )
    if (checkExpirationDate.isValid) {
      clearErrors("expirationDate")
    } else {
      setError("expirationDate", {
        type: "manual",
        message: "Invalid expiration date",
      })
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Image
          src={mastercard}
          width={500}
          height={500}
          className="h-5 w-auto"
          alt="mastercard"
        />
        <Image
          src={visa}
          width={500}
          height={500}
          className="h-5 w-auto"
          alt="visa"
        />
        <Image
          src={amex}
          width={500}
          height={500}
          className="h-5 w-auto"
          alt="amex"
        />
        <Image
          src={discover}
          width={500}
          height={500}
          className="h-5 w-auto"
          alt="discover"
        />
      </div>
      <div>
        <ErrorMessage
          title="Please check the following errors"
          errors={[
            ...(errors.cardNumber === undefined
              ? []
              : [errors.cardNumber.message as string]),
            ...(errors.cvv === undefined ? [] : [errors.cvv.message as string]),
            ...(errors.expirationDate === undefined
              ? []
              : [errors.expirationDate.message as string]),
          ]}
        />
        <Input
          label="Card Number"
          id="cardNumber"
          placeholder="0000 0000 0000 0000"
          type="text"
          className="mb-2"
          // disabled={isPending}
          {...register("cardNumber", {
            minLength: 10,
            maxLength: 20,
            required: "This field is required",
            onChange: (e) => {
              const value = e.target.value
              const trimmedValue = value.replace(/\s/g, "")
              const spacedValue = trimmedValue.replace(/(.{4})/g, "$1 ")
              updatePaymentInfo({ key: "cardNumber", value: e.target.value })
              setValue("cardNumber", String(spacedValue).trim())
              validateCard()
            },
          })}
          required
        />

        <div className="grid grid-flow-col space-x-2">
        <Input
  label="Expiration date"
  id="expirationDate"
  placeholder="MM/YY"
  type="text"
  {...register("expirationDate", {
    minLength: 5,
    maxLength: 5,
    required: "This field is required",
    onChange: (e) => {
      let value = e.target.value;
      updatePaymentInfo({
        key: "expirationDate",
        value: e.target.value,
      });

      if (e.nativeEvent.inputType === "deleteContentBackward") {
        value = value.slice(0, -2);
        setValue("expirationDate", value);
      } else {
        value = value.replace(/\//g, "");
        const slashValue = value.replace(/(.{2})/g, "$1/");
        const newValue = String(slashValue).trim();

        if (newValue.length > 5) {
          setValue("expirationDate", newValue.slice(0, -1));
          validateExpirationDate();
        } else {
          setValue("expirationDate", newValue.trim());
          validateExpirationDate();
        }

        if (value.length >= 4) {
          const expirationMonth = value.slice(0, 2); 
          const expirationYear = "20" + value.slice(2, 4); 
          updatePaymentInfo({ key: "expirationMonth", value: expirationMonth });
          updatePaymentInfo({ key: "expirationYear", value: expirationYear });
        }
      }
    },
  })}
  required
/>


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
      </div>
      <Input
        label="Cardholder Name"
        id="cardholderName"
        type="text"
        // disabled= {isPending}
        {...register("cardholderName", {
          required: "This field is required",
          onChange: (e) =>
            updatePaymentInfo({ key: "cardholderName", value: e.target.value }),
        })}
        required
      />
      <Input
        label="Zip code"
        id="zipCode"
        type="number"
        // disabled={isPending}
        {...register("zipCode", {
          minLength: 4,
          required: "This field is required",
          onChange: (e) =>
            updatePaymentInfo({ key: "zipCode", value: e.target.value }),
        })}
        required
      />
      <div>
        <Select
          {...register("country", {
            required: "This field is required",
            onChange: (e) =>
              updatePaymentInfo({ key: "country", value: e.target.value }),
          })}
          label="Country"
          required
        >
          <Option value={""}>Select Country</Option>
          {COUNTRIES.map((country) => (
            <Option key={country.code} value={country.code}>
              {country.name}
            </Option>
          ))}
        </Select>
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

export default PaymentMethodForm
