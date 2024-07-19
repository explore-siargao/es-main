"use client"
import { useEffect } from "react"
import PricingContent from "./PricingContent"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/Accordion"
import { Button } from "@/common/components/ui/Button"
import { Spinner } from "@/common/components/ui/Spinner"
import { Typography } from "@/common/components/ui/Typography"
import { useFieldArray, useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import useGetPropertyById from "../../hooks/useGetPropertyById"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import useUpdatePropertyFinishedSection from "../../hooks/useUpdatePropertyFinishedSections"
import useGetPropertyUnitPricesById from "../../hooks/useGetPropertyUnitPricesById"
import useUpdatePropertyUnitPriceById from "../../hooks/useUpdatePropertyUnitPriceById"

interface PricingContentProps {
  onChange?: (id: string, value: number) => void
  pageType?: string
  identifier?: string
}

const Pricing = ({ pageType }: PricingContentProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = params.listingId
  const { data, isLoading } = useGetPropertyById(listingId)
  const { handleSubmit, control, reset } = useForm()
  const { mutate, isPending } = useUpdatePropertyUnitPriceById(listingId)
  const { data: unitPriceData } = useGetPropertyUnitPricesById(listingId)
  const { mutateAsync: updateFinishedSection } =
    useUpdatePropertyFinishedSection(listingId)
  const { fields, update } = useFieldArray({
    control,
    name: "unitPrices",
    keyName: "key",
  })

  const onSubmit = (data: any) => {
    const cleanedUnitPrices = data.unitPrices.map((item: any) => ({
      ...item,
      unitName: item.unitName.startsWith("Custom: ")
        ? item.unitName.slice("Custom: ".length)
        : item.unitName,
    }))

    const callBackReq = {
      onSuccess: (data: any) => {
        if (!data.error) {
          toast.success(data.message)
          queryClient.invalidateQueries({
            queryKey: ["property-finished-sections", listingId],
          })
          queryClient.invalidateQueries({
            queryKey: ["property-unit-pricing", listingId],
          })
        } else {
          toast.error(String(data.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }

    if (
      pageType === "setup" &&
      !data?.item?.finishedSections?.includes("pricing")
    ) {
      mutate(cleanedUnitPrices, callBackReq)
      updateFinishedSection({ newFinishedSection: "pricing" }, callBackReq)
    } else {
      mutate(cleanedUnitPrices, callBackReq)
      queryClient.invalidateQueries({
        queryKey: ["property", listingId],
      })
    }

    if (pageType === "setup") {
      router.push(`/hosting/listings/properties/setup/${listingId}/photos`)
    }
  }

  useEffect(() => {
    if (!isLoading && !isPending && !data?.error && data?.item) {
      const items = unitPriceData?.items?.map((item: any, index: number) => ({
        _id: item._id,
        unitName: item.unitName.startsWith("Custom: ")
          ? item.unitName.slice("Custom: ".length)
          : item.unitName + " " + index,
        unitPrice: {
          ...item.unitPrice,
        },
      }))

      reset({ unitPrices: items })
    }
  }, [data, isLoading, unitPriceData])

  return (
    <div className="my-20">
      {isLoading ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <>
          <Typography
            variant="h1"
            fontWeight="semibold"
            className="flex justify-between items-center mb-4"
          >
            Pricing
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Accordion type="single" collapsible>
              {fields.map((field, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    {
                      // @ts-ignore
                      field.unitName
                    }
                  </AccordionTrigger>
                  <AccordionContent>
                    <PricingContent
                      index={index}
                      // @ts-ignore
                      field={field}
                      update={update}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="fixed bottom-0 bg-text-50 w-full p-4 bg-opacity-60">
              <Button size="sm" type="submit">
                {pageType === "setup" ? "Save & Next" : "Save Changes"}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default Pricing
