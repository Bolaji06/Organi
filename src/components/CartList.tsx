"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";

import image from "../../public/assets/fragrance.webp";
import { AddToFavoriteButton, RemoveFromCart } from "./client";
import { IProduct } from "@/lib/definitions";
import { getCurrencySign } from "@/lib/utils";
import { CartContext, CartItemType } from "@/app/context/cartContext";
import React, { useContext } from "react";
import clsx from "clsx";

export interface Item {
  data: IProduct;
  quantity: number;
}

/**
 Renders cart list component that displays
 the product image, product title, product price,
 brand name, buttons to increase and decrease quantity number
 product quantity, a add to cart button and a like icon
 * 
 * @param data cart items list
 * @returns {React.ReactElement} The rendered cart list
 *
 */
export default function CartList({ data }: Item) : React.ReactElement{
  const router = useRouter();
  const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, quantity } = useContext(CartContext);

  //console.log(data);
  return (
    <>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-[4fr,2fr,2fr]">
          <header
            className="hidden sm:block p-1 px-2 bg-slate-300 text-slate-950 font-bold
                            rounded-tl-sm rounded-bl-sm"
          >
            <h1>Item Details</h1>
          </header>
          <header className="hidden sm:block p-1 text-slate-950 font-bold bg-slate-300">
            <h1>Price</h1>
          </header>
          <header className="hidden sm:block p-1 rounded-tr-sm rounded-br-sm bg-slate-300 text-slate-950 font-bold">
            <h1 className="text-right px-1">Actions</h1>
          </header>
        </div>
        {
          // @ts-ignore
          data.map((item: CartItemType) => {
            return (
              <div
                key={item.item.id}
                className="grid grid-cols-1 sm:grid-cols-[4fr,2fr,2fr]
                     border-b border-slate-300 pb-4 transition-all ease-in-out duration-500"
              >
                <section className="flex gap-3 pt-2">
                  <div>
                    <Image
                      src={item.item.images[0]}
                      alt="product image"
                      width={200}
                      height={200}
                      className="object-cover aspect-square w-32"
                    />
                  </div>
                  <div>
                    <div>
                      <h3 className="text-gray-800 font-bold first-letter:capitalize">
                        {item.item.title}
                      </h3>
                      <p className="text-sm">
                        Brand: <span>{item.item.brand}</span>
                      </p>
                    </div>
                    <div className="flex text-center border mt-5">
                     <Button
                        onClick={ ()=> decreaseQuantity(item.item)}
                        className={`${clsx({'invisible': item.quantity === 1})} bg-white text-center w-8 h-8 text-lg font-bold
                                     rounded-none text-black active:bg-slate-100`}
                      >
                        -
                      </Button>
                      <div
                        className="bg-white flex justify-center items-center h-8 text-lg font-bold
                                      text-black border-gray-400 border-r border-l px-3"
                      >
                        <p>{item.quantity}</p>
                      </div>
                      <Button
                        onClick={() => increaseQuantity(item.item)}
                        className="bg-white p-0 w-8 h-8 text-lg font-bold
                                     rounded-none text-black active:bg-slate-100"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </section>

                <section className="pt-1">
                  <h2 className="text-lg text-gray-800 font-bold">
                    {getCurrencySign((item.item.price * 100) * item.quantity)}
                  </h2>
                  <p className="text-amber-800 text-sm">{`${getCurrencySign(item.item.price * 100)} x ${item.quantity}`}</p>
                </section>

                <section className="">
                  <section className="flex justify-end items-center pt-2">
                    <Button onClick={() => removeFromCart(item.item)}>
                      Remove from Cart
                    </Button>
                    {/* <AddToFavoriteButton data={item.item}/> */}
                  </section>
                </section>
              </div>
            );
          })
        }
      </main>
    </>
  );
}
