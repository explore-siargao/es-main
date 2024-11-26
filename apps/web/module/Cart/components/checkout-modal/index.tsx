import ModalContainer from "@/common/components/ModalContainer";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ModalContainerFooter from "@/common/components/ModalContainer/ModalContainerFooter";
import { useQueryClient } from "@tanstack/react-query";
import useAddGCashPayment from "../../hooks/use-add-gcash-payment";
import PaymentOptions from "@/module/Listing/Property/Checkout/PaymentOptions";
import { T_Add_To_Cart, T_Cart_Item } from "@repo/contract-2/cart";
import { useRouter } from "next/navigation";
import { Button } from "@/common/components/ui/Button";
import OrderSummary from "../order-summary";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: T_Add_To_Cart[];
}

const CheckoutModal = ({
  isOpen: openModal,
  onClose: closeModal,
  items,
}: CheckoutModalProps) => {
  const [step, setStep] = useState<"payment" | "summary">("payment");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useAddGCashPayment();
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<T_Cart_Item[]>([]);
  const calculateTotal = items.length > 0 ? items.map(item => item.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0) : 0

  const remapItems = (items: T_Add_To_Cart[]) => {
    return items.map(item => ({
      ...item,
      activityIds: {
        ...item.activityIds,
        activityId: item.activityIds?.activityId._id 
      },
      rentalIds: {
        ...item.rentalIds,
        rentalId: item.rentalIds?.rentalId._id 
      }
    }));
  };
  const remappedItems = remapItems(items);
  console.log(remappedItems)
  const handleProceedToPayment = () => {
    mutate(remappedItems, {
      onSuccess: (data: any) => {
        if (!data.error) {
          queryClient.invalidateQueries({
            queryKey: ["get-cart-item"],
          });
          router.push(data.item.action.link);
          closeModal();
        } else {
          toast.error(String(data.message));
          console.log(data.items)
        }
      },
      onError: (err: any) => {
        toast.error(String(err));
      },
    });
  };

  return (
    <ModalContainer
      title={step === "payment" ? "Select Payment Method" : "Order Summary"}
      onClose={closeModal}
      isOpen={openModal}
      size="sm"
    >
      <div className="p-6">
        {step === "payment" && (
          <>
            <PaymentOptions />
          </>
        )}

        {step === "summary" && (
          <>
            <OrderSummary
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
              items={items as T_Cart_Item[]}
            />
            <div className="border rounded-xl p-4">
              <h2 className="text-md">Payment Method: GCash</h2>
            </div>
            <div className="border rounded-xl p-4 mt-4">
              <h2 className="text-md">Grand Total: {calculateTotal}</h2>
            </div>
          </>
        )}
      </div>
      <div className="pl-6 flex justify-between items-center">
        {step === "summary" && (
          <div className="pb-3">
          <Button
          variant={"ghost"}
            onClick={() => setStep("payment")}
          >
            Back
          </Button>
          </div>
        )}
          <div className="ml-auto">
    <ModalContainerFooter
      positive={step === "payment" ? "Next" : "Proceed to Payment"}
      isPending={isPending}
      isSubmit={false}
      onClose={closeModal}
      buttonFn={() => {
        if (step === "payment") {
          setStep("summary");
        } else {
          handleProceedToPayment();
        }
      }}
    />
  </div>
      </div>
    </ModalContainer>
  );
};

export default CheckoutModal;
