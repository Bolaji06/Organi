"use client";
import { usePaystackPayment } from "react-paystack";
import { Button } from "./ui/button";
import { FormEvent } from "react";


export default function PayStackComponent({
  amount,
  email,
  isFormFilled,
}: {
  amount: number;
  email: string;
  isFormFilled: boolean;
}) {
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount,
    publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_API_TEST_KEY}`,
    onSuccess: (reference: string) => {
      console.log("Success!", reference)
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
        <Button disabled={isFormFilled} onClick={handleInitializePayment}>
          Make Payment
        </Button>
      </main>
    </>
  );
}
