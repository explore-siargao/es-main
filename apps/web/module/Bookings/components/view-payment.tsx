import { Typography } from "@/common/components/ui/Typography"
import {
  LucideCreditCard,
} from "lucide-react"
import gcash from "@/common/assets/gcash.png"
import Image from "@/common/components/ui/image"
import xendit from "@/common/assets/powered-xendit.png"
import Link from "next/link"
import _ from "lodash";

interface ViewPaymentProps {
  paymentDetails: {
    type: "CARD" | "EWALLET"; 
    cardDetails?: {
      cardType: string,
      maskedCardNumber: string,
      network: string,
    },
    ewallet: {
      channelCode: string,
    }
  }
}



const ViewPayment = ({
  paymentDetails,
}: ViewPaymentProps) => {

  
  function extractLastDigits(maskedCardNumber:string) {
    return maskedCardNumber ? maskedCardNumber.match(/\d+$/)?.[0] || "" : "";
  }
  const options = {
    CARD: {
      name: paymentDetails?.cardDetails
        ? `Paid using ${_.capitalize(paymentDetails.cardDetails.cardType)} ${_.capitalize(paymentDetails.cardDetails.network)} ending with ${extractLastDigits(paymentDetails.cardDetails.maskedCardNumber)}`
        : "Paid using Credit or Debit card",
      icon: <LucideCreditCard className="text-text-300" />,
    },
    EWALLET: {
      name: "Paid using GCash",
      icon: (
        <Image
          src={gcash}
          width={500}
          height={500}
          className="h-5 w-auto"
          alt="gcash"
        />
      ),
    },
  };

  const selectedPayment = options[paymentDetails.type] || {
    name: "Unknown Payment Method",
    icon: null,
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          {selectedPayment.icon}
          <Typography variant="h3" fontWeight="semibold">
            {selectedPayment.name}
          </Typography>
        </div>
        <Link href="https://xendit.co/" target="_blank">
          <Image
            src={xendit}
            width={500}
            height={500}
            className="h-10 w-auto"
            alt="powered by xendit"
          />
        </Link>
      </div>
    </div>
  );
};

export default ViewPayment;

