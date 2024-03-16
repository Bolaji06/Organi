"use client";

import { ShoppingCart, Heart, CircleUserRound } from "lucide-react";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";
import { useEffect, useContext, Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/context/cartContext";
import { SvgSpinnersEclipse } from "../client";

export function Cart() {
  const [hasMount, setHasMount] = useState(false);
  const { cartCounter } = useContext(CartContext);

  useEffect(() => {
    setHasMount(true);
  }, []);

  return (
    <>
      <div className="cart relative">
        <ShoppingCart size={20} color="black" />

        <div
          className="count text-center absolute bg-primary w-4 h-4 rounded-full
                            -top-2 -right-3"
        >
          <p
            className="text-white text-xs text-center 
                                    font-extrabold"
          >
            {cartCounter}
          </p>
        </div>
      </div>
    </>
  );
}

export function LikeProduct() {
  const { favoriteCounter } = useContext(CartContext);

  return (
    <>
      <div className="liked-product relative">
        <Heart size={20} color="black" />
        {
          <div
            className="count text-center absolute bg-primary w-4 h-4 rounded-full
                            -top-2 -right-3"
          >
            <p
              className="text-white text-xs text-center 
                                font-extrabold"
            >
              {favoriteCounter}
            </p>
          </div>
        }
      </div>
    </>
  );
}


