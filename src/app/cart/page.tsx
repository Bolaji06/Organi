"use client";

import CheckoutCard from "@/components/CheckoutCard";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import CartList from "@/components/CartList";
import { Skeleton } from "@/components/ui/skeleton";
import ProductDetailsSkeleton from "@/components/skeleton";
import { SvgSpinnersEclipse } from "@/components/client";
import CartSkeleton from "@/components/ui/cart-skeleton";
import emptyCart from "../../../public/assets/empty-cart.png";
import Image from "next/image";


/**
 * This is a cart page that returns a
 * top navigation breadcrumb a loading UI skeleton if the page has
 * not mounted.When the component has mounted it display the CartList
 * component and the Checkout card component.
 * It also display a fallback image component if the cartList is empty
 * 
 * @returns {React.ReactElement} The cart page component
 */
export default function CartPage(): React.ReactElement | null {
  const { cartItems } = useContext(CartContext);
  const [hasMount, setHasMount] = useState(false);

  useEffect(() => {
    setHasMount(true);
  }, []);

  return (
    <>
      <main className="mt-2">
        <header className="bg-white px-4 lg:px-12">
          <Breadcrumbs
            breadcrumbs={[
              {
                label: "home",
                href: "/",
              },
              {
                label: "cart",
                href: "/cart",
                active: true,
              },
            ]}
          />
          <h1 className="text-black text-2xl lg:text-4xl font-bold py-4">
            Shopping Cart
          </h1>
        </header>

        <section className="bg-slate-200 py-4 px-4 lg:px-12">
          <div className="pt-5">
            <Link
              href={"/"}
              className="py-1 px-5 rounded-md mb-4 border border-primary text-primary 
                            hover:bg-primary transition-all ease-in-out duration-500 hover:text-white font-medium"
            >
              Continue Shopping
            </Link>
          </div>

          {hasMount ? (
            <div>
              {cartItems.length ? (
                <div className="grid lg:grid-cols-[4fr,1fr] gap-6 mt-8">
                  <section className="">
                    {/* @ts-ignore */}
                    <CartList data={cartItems} />
                  </section>
                  <section className="">
                    <CheckoutCard />
                  </section>
                </div>
              ) : (
                <div className="mt-10 flex flex-col justify-center items-center">
                  <Image
                    src={emptyCart}
                    alt="Empty Cart Image"
                    className="w-auto h-auto"
                  />
                  <h1 className="text-center font-semibold text-2xl pb-6">
                    Oopsy! Your cart is currently empty
                  </h1>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-10">
              <CartSkeleton />
            </div>
          )}
        </section>
      </main>
    </>
  );
}
