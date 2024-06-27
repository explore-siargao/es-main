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
  const { handleSubmit, control } = useForm()
  const { mutateAsync: updateFinishedSection } =
    useUpdatePropertyFinishedSection(listingId)
  const { fields, append, update } = useFieldArray({
    control,
    name: "unitPrices",
    keyName: "key",
  })

  const onSubmit = (data: any) => {
    if (
      pageType === "setup" &&
      !data?.item?.finishedSections?.includes("pricing")
    ) {
      const callBackReq = {
        onSuccess: (data: any) => {
          if (!data.error) {
            queryClient.invalidateQueries({
              queryKey: ["property-finished-sections", listingId],
            })
          } else {
            toast.error(String(data.message))
          }
        },
        onError: (err: any) => {
          toast.error(String(err))
        },
      }
      updateFinishedSection({ newFinishedSection: "pricing" }, callBackReq)
    } else {
      queryClient.invalidateQueries({
        queryKey: ["property", listingId],
      })
    }
    if (pageType === "setup") {
      router.push(`/hosting/listings/properties/setup/${listingId}/policies`)
    }
  }

  useEffect(() => {
    if (!isLoading && !data?.error && data?.item) {
      // const items = data?.item?.BookableUnit.map((item) => ({
      //   id: item.id,
      //   unitName: item.unitName,
      //   unitPrice: {
      //     id: item.unitPrice.id,
      //     baseRate: item.unitPrice.baseRate,
      //     baseRateMaxCapacity: item.unitPrice.baseRateMaxcapacity,
      //     maximumCapacity: item.unitPrice.maximumCapacity,
      //     pricePerAdditionalPerson: item.unitPrice.pricePerAdditionalPerson,
      //     discountedWeeklyRate: item.unitPrice.discountedWeekLyRate,
      //     discountMonthlyRate: item.unitPrice.discountMonthlyRate,
      //   },
      // }))

      append([])
    }
  }, [])

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
