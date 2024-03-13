"use client";
import { usePaystackPayment } from "react-paystack";
import { Button } from "./ui/button";
import { FormEvent } from "react";


export default function PayStackHookExample({
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
    publicKey: "pk_test_bb90e1b2782df47662013e5ea0d8cc45712737d9",
  };
  function onSuccess(reference: string) {
    console.log("Go back Home", reference);
  }
  //console.log(process.env.PAYSTACK_API_TEST_KEY);
  function onClose() {
    console.log("PayStack Dialog close");
  }
  const initializePayment = usePaystackPayment(config);
  function handleInitializePayment(e: FormEvent) {
    e.preventDefault();
    // @ts-ignore
    initializePayment(onSuccess, onClose);
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
