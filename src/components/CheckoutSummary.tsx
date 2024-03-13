"use client";

import { CartContext } from "@/app/context/cartContext";
import { getCurrencySign } from "@/lib/utils";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CheckoutTotalPaymentSkeleton, SummarySkeleton } from "./ui/checkout-skeleton";

export default function CheckOutSummary() {
  const [hasMount, setHasMount] = useState(false);
  const { cartItems, getTotalPriceWithQuantity, getTotalQuantity } = useContext(CartContext);
  //console.log(cartItems);

  const deliveryFee = getTotalQuantity() * 200
  const subTotalPrice = getCurrencySign(getTotalPriceWithQuantity() * 100)
  const totalPrice = deliveryFee + getTotalPriceWithQuantity() * 100


  useEffect(() => {
    setHasMount(true);
  }, [])
  return (
    <>
      <main className="border rounded-md">
        <section>
          <header className="py-2 px-3 border-b border-b-slate-300">
            <h2 className="uppercase font-bold text-gray-800">
              Checkout Summary
            </h2>
          </header>
         { hasMount ? <section className="overflow-y-auto h-72 lg:h-96">
            {cartItems.map((product, index) => {
              return <div key={index} className="py-3 mx-2">
                <div className="flex  gap-2">
                  <div>
                    <Image 
                    src={product.item.images[0]}
                    width={100}
                    height={100}
                    className="w-20 rounded-md aspect-square"
                    alt="Product Image"/>
                  </div>
                  <div>
                    <h2 className="first-letter:uppercase font-semibold">{product.item.title}</h2>
                    <p className="text-sm"><span className="font-semibold">{getCurrencySign(product.item.price * 100)}</span></p>
                    <p className="text-sm">Quantity: <span className="font-bold">{product.quantity}</span></p>
                    <p className="text-sm">Delivery Fee: <span className="font-bold">{product.quantity} X {getCurrencySign(200)}</span></p>
                  </div>
                </div>
              </div>
            })
              
            }
          </section> : <SummarySkeleton />}

         {hasMount ? <div className="bg-white p-4 flex justify-between items-center">
            <div className="">
              <p>Subtotal</p>
              <p className="text-primary font-bold py-3">Delivery Fees</p>
              <p>Total</p>
            </div>

            <div>
              <p>{subTotalPrice}</p>
              <p className="text-primary font-bold py-3">{getCurrencySign(deliveryFee)}</p>
              <p className="font-bold">{getCurrencySign(totalPrice)}</p>

            </div>

          </div> : <CheckoutTotalPaymentSkeleton />}
        </section> 
      </main>
    </>
  );
}
