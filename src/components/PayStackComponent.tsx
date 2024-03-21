import { usePaystackPayment } from "react-paystack";
import { Button } from "./ui/button";
import { FormEvent } from "react";

interface IReference {
  message: string,
  redirectUrl: string,
  reference: string,
  status: string,
  trans: string,
  transaction: string,
  trxref: string,
}

export default function PayStackComponent({
  amount,
  email,
  isFormFilled,
  setStatus,
}: {
  amount: number;
  email: string;
  isFormFilled: boolean;
  setStatus: (prevState: string) => void,
}) {
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount,
    publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_API_TEST_KEY}`,
    onSuccess: (reference: IReference) => {
      console.log("Success!", reference)
      setStatus(reference?.status)
    },
    onClose: () => {
      console.log('Popup close')
    } 

  };

  const initializePayment = usePaystackPayment(config);
  function handleInitializePayment(e: FormEvent) {
    e.preventDefault();
    initializePayment(config);
  }
  return (
    <>
      <main>
        <Button disabled={!isFormFilled} onClick={handleInitializePayment}>
          Make Payment
        </Button>
      </main>
    </>
  );
}
