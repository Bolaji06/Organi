"use client";

import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import { Cart } from "./cart-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useContext } from "react";
import { CartContext } from "@/app/context/cartContext";
import Image from "next/image";
import { getCurrencySign } from "@/lib/utils";
import { Separator } from "./separator";

import emptyCart from "../../../public/assets/empty-cart.png";
import Link from "next/link";
import { AlertDialogPopOver } from "../AlertDialog";
import { clear } from "console";
import { useRouter } from "next/navigation";

export default function CartDropdown() {
  const { cartItems, clearCart, removeItemFromList, getTotalCartItems } =
    useContext(CartContext);

  function handleRemoveFromCart(index: number) {
    removeItemFromList(index);
    console.log("removed!");
  }
  const router = useRouter();

  return (
    <>
      <main>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-0 bg-transparent">
              <Cart />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {cartItems.length !== 0 ? (
              <DropdownMenuLabel className="flex justify-between items-center">
                <p>Your Cart</p>
                <AlertDialogPopOver
                  action={clearCart}
                  title="Clear Cart"
                  description="This action cannot be undone. This will permanently 
                            remove all items from your cart."
                />
              </DropdownMenuLabel>
            ) : null}
            <DropdownMenuGroup className="w-[270px] max-h-72 h-full overflow-y-scroll overflow-x-hidden mr-0">
              {cartItems?.map((cartItem, index: number) => {
                return (
                  <div key={index}>
                    <DropdownMenuItem key={index}>
                      <div className="flex justify-between w-full">
                        <div className="flex gap-2 items-center">
                          <Image
                            width={600}
                            height={600}
                            src={cartItem?.item?.images[0]}
                            alt="cart item image"
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <h2 className="font-semibold capitalize">
                              {cartItem?.item?.title}
                            </h2>
                            <p>
                              {getCurrencySign(cartItem?.item?.price * 100)}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRemoveFromCart(index)}
                          className="bg-transparent hover:bg-primary hover:text-white text-primary"
                        >
                          Remove
                        </Button>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="px-2" />
                  </div>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuItem>
              {cartItems.length !== 0 ? (
                <div className="w-full">
                  <p className="mb-1">
                    Total:{" "}
                    <span className="font-bold">
                      {getCurrencySign(getTotalCartItems())}
                    </span>
                  </p>
                  <Button
                    onClick={() => router.push("/cart")}
                    className="w-full"
                  >
                    View All
                  </Button>
                </div>
              ) : (
                <div className="w-full flex flex-col justify-center items-center">
                  <Image
                    src={emptyCart}
                    alt="empty cart"
                    width={150}
                    height={150}
                    className="m-auto"
                  />
                  <p>Cart is empty</p>
                  <Link
                    href={"/#shop"}
                    className="px-4 py-2 text-white font-medium rounded-sm bg-primary mt-3 mb-4"
                  >
                    Go Shopping
                  </Link>
                </div>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </main>
    </>
  );
}
