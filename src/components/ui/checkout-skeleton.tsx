import { CartContext } from "@/app/context/cartContext";
import { useContext } from "react";
import { Skeleton } from "./skeleton";

export function SummarySkeleton() {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      <main>
        <section className="overflow-y-auto h-72 lg:h-96">
         
              <div className="py-3 mx-2">
                <div className="flex  gap-2">
                  <div>
                    <Skeleton className="w-20 aspect-square" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>
        </section>
      </main>
    </>
  );
}

export function CheckoutTotalPaymentSkeleton() {
  return (
    <>
      <main>
        <div className="bg-white p-4 flex justify-between items-center">
          <div className="">
            <p>Subtotal</p>
            <p className="text-primary font-bold py-3">Delivery Fees</p>
            <p>Total</p>
          </div>

          <div>
            <Skeleton className="w-32 h-3" />
            <Skeleton className="w-32 h-3 my-5" />
            <Skeleton className="w-32 h-3" />
          </div>
        </div>
      </main>
    </>
  );
}
