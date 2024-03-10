"use client";
import { Button } from "./ui/button";

import verve from "../../public/assets/vervecard.webp";
import visa from "../../public/assets/visacard.webp";
import master from "../../public/assets/mastercard.webp";
import Image from "next/image";
import { LockKeyhole } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/app/context/cartContext";
import { getCurrencySign } from "@/lib/utils";
import { useRouter } from "next/navigation";

/**
 * Renders a checkout card component that displays the order summary
    delivery cahrges, subtotal, total price, and payment options
 *
 * @returns {React.ReactElement} The rendered checkout card component
 */
export default function CheckoutCard(): React.ReactElement | null {
  const router = useRouter()
  const cards = [visa, master, verve];
  const { cartItems, getTotalQuantity, getTotalPriceWithQuantity } =
    useContext(CartContext);

  const totalPriceWithQuantity = getCurrencySign(
    getTotalPriceWithQuantity() * 100
  );
  const totalQuantity = getTotalQuantity();

  return (
    <>
      <section
        className="bg-white shadow-md border-2 border-gray-300 rounded-sm
            lg:border-dashed border-spacing-4"
      >
        <div className="border-b border-slate-300 py-1 flex justify-between items-center font-bold text-lg">
          <h2 className="px-2">Order Summary</h2>
          <h2 className="px-2">
            {totalQuantity} {cartItems.length > 1 ? "Items" : "Item"}
          </h2>
        </div>
        <div className="flex justify-between py-2 border-b border-slate-300">
          <p className="text-sm px-2">Delivery Charges</p>
          <p className="text-xs max-w-sm lg:max-w-[100px] px-2">
            Add your Delivery address at checkout to see delivery charges
          </p>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-300">
          <p className="text-sm px-2 ">Subtotal</p>
          <p className="text-sm px-2 font-bold">{totalPriceWithQuantity}</p>
        </div>

        <div className="flex justify-between py-2 border-b border-slate-300 text-base">
          <p className="px-2 font-bold">Total</p>
          <p className="px-2 font-bold">{totalPriceWithQuantity}</p>
        </div>
        <div className="py-2 border-b border-slate-300">
          <p className="text-xs text-red-800 text-right px-2">
            Excluding delivery charges
          </p>
          <div className="px-2 py-1">
            <Button onClick={() => router.push("/checkout")} className="w-full h-10 rounded-sm font-semibold">
              Continue to checkout
            </Button>
            <p className="text-xs py-2 text-gray-400 text-center">Kindly login to checkout</p>
          </div>
        </div>

        <footer>
          <div className="flex justify-evenly items-center py-2 border-b border-slate-300">
            {cards.map((card, index) => {
              return (
                <Image
                  key={index}
                  src={card}
                  alt={`card payment ${card}`}
                  className="w-6"
                />
              );
            })}
          </div>
          <div className="flex gap-1 py-2 px-1 items-center justify-center">
            <LockKeyhole size={16} color="green" />
            <p className="text-xs text-slate-400 text-center">
              Transactions are 100% secure and safe
            </p>
          </div>
        </footer>
      </section>
    </>
  );
}
