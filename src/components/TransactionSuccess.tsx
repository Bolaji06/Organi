"use client";
import { getDeliveryDate } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function TransactionSuccess() {
  const { width, height } = useWindowSize();
  
  const { from, to } = getDeliveryDate();

  return (
    <>
      <main className="mt-6 flex justify-center items-center text-center">
        <div className="flex flex-col">
          <h1 className="font-extralight text-4xl pb-3">Payment Received</h1>
          <div className="flex justify-center items-center my-6">
            <CheckCircle size={50} color="green" />
          </div>
          <div>
            <p className="font-semibold py-1">
              Your order is expected to arrive by <span className="font-bold">{to}</span>
            </p>
            <p className="text-sm font-semibold text-slate-500 py-2 mb-4">
              Sit back while we get your orders to you
            </p>
          </div>
        </div>
          <Confetti
            width={width}
            height={height + scrollY}
            recycle={false}
            className="overflow-x-hidden"
          /> 
      </main>
    </>
  );
}
