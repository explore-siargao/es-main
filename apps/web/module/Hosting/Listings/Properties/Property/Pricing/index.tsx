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
import { T_UnitPrice } from "@repo/contract"

interface PricingContentProps {
  onChange?: (id: string, value: number) => void
  pageType?: string
  identifier?: string
}

interface FormData {
  unitPrice: T_UnitPrice[]
  _id: string
}

const Pricing = ({ pageType }: PricingContentProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const params = useParams<{ listingId: string }>()
  const listingId = params.listingId
  const { data, isLoading } = useGetPropertyById(listingId)
  const { handleSubmit, control, reset } = useForm<FormData>()
  const { mutate, isPending } = useUpdatePropertyUnitPriceById(listingId)
  const { data: unitPriceData } = useGetPropertyUnitPricesById(listingId)
  const { mutateAsync: updateFinishedSection } =
    useUpdatePropertyFinishedSection(listingId)
  const { fields, update } = useFieldArray({
    control,
    name: "unitPrice",
    keyName: "key",
  })
 
  const onSubmit = async (data: any) => {
    const unitPriceDataList = data.unitPrice;

    let errorMessages: string[] = [];
    unitPriceDataList.forEach((unitPriceData: any) => {
      const { unitName, unitPrice } = unitPriceData;
    
      const baseRateInvalid = unitPrice.baseRate === undefined || 
                              unitPrice.baseRate === null || 
                              Number.isNaN(unitPrice.baseRate) || 
                              unitPrice.baseRate === 0;
    
      const pricePerAdditionalPersonInvalid = unitPrice.pricePerAdditionalPerson === undefined || 
                                               unitPrice.pricePerAdditionalPerson === null || 
                                               Number.isNaN(unitPrice.pricePerAdditionalPerson) || 
                                               unitPrice.pricePerAdditionalPerson === 0;
    
      if (baseRateInvalid || pricePerAdditionalPersonInvalid) {
        errorMessages.push(unitName);
      }
    });
    
    if (errorMessages.length > 0) {
      const uniqueNames = Array.from(new Set(errorMessages));
      toast.error(`Please fill up required value for unit ${uniqueNames.join(", ")}`);
      return;
    }
    

    const payloads = unitPriceDataList.map((unitPriceData: any) => ({
      ...unitPriceData,
      bookableUnitId: data._id,
    }))

    const callBackReq = {
      onSuccess: (response: any) => {
        if (!response.error) {
          toast.success(response.message)
          queryClient.invalidateQueries({
            queryKey: ["property-finished-sections", listingId],
          })
          queryClient.invalidateQueries({
            queryKey: ["property-unit-pricing", listingId],
          })
        } else {
          toast.error(String(response.message))
        }
      },
      onError: (err: any) => {
        toast.error(String(err))
      },
    }

    const handleMutate = async () => {
      try {
        for (const payload of payloads) {
          await mutate(payload, callBackReq)
        }
        queryClient.invalidateQueries({
          queryKey: ["property", listingId],
        })
      } catch (error) {
        toast.error(String(error))
      }
    }

    if (
      pageType === "setup" &&
      !data?.item?.finishedSections?.includes("pricing")
    ) {
      try {
        await handleMutate()
        updateFinishedSection({ newFinishedSection: "pricing" }, callBackReq)
      } catch (error) {
        toast.error(String(error))
      }
    } else {
      handleMutate()
    }

    if (pageType === "setup") {
      router.push(`/hosting/listings/properties/setup/${listingId}/photos`)
    }
  }

  useEffect(() => {
    if (
      !isLoading &&
      !isPending &&
      !data?.error &&
      data?.item &&
      unitPriceData?.items?.length
    ) {
      const items = unitPriceData?.items?.map((item: any, index: number) => ({
        _id: item._id,
        unitName: item.unitName.startsWith("Custom: ")
          ? item.unitName.slice("Custom: ".length)
          : item.unitName + " " + index,
        unitPrice: {
          ...item.unitPrice,
        },
      }))

      reset({ unitPrice: items })
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
