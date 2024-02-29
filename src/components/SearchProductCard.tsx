"use client";

import { getCurrencySign, getDiscountPrice, ignoreCase } from "@/lib/utils";
import Image from "next/image";
import TagCount from "./ui/tag";
import clsx from "clsx";
import { match } from "assert";

type SProductDetails = {
  image: Array<string>;
  title: string;
  description?: string;
  price: number;
  rating: number;
  discount: number;
  stock?: number;
};
export default function SearchProductCard({
  image,
  title,
  description,
  price,
  rating,
  discount,
  stock,
}: SProductDetails) {
  return (
    <>
      <section
        className="bg-white  rounded-sm py-3 px-2 hover:shadow-md
             transition-shadow ease-in-out duration-700"
      >
        <div className="flex gap-3">
          <div className="basis-[30%] shrink-0 w-full relative">
            <div className="absolute top-0 right-0 p-1 text-xs text-white bg-red-500 rounded-sm">
              {`-${Math.round(discount)}%`}
            </div>
            <Image
              src={image[0]}
              alt="Product image"
              width={100}
              height={100}
              className="object-cover w-full aspect-square"
            />
          </div>

          <div className="basis-[70%] px-3">
            {/* product details here */}
            <div className="flex flex-col md:flex-row justify-between md:items-center ">
              <h2 className="font-bold capitalize">{title}</h2>
              <div className="flex items-center gap-4">
                {discount && (
                  <p className="font-bold text-base text-black lg:text-lg">
                    {getCurrencySign(getDiscountPrice(price, discount))}
                  </p>
                )}

                <p
                  className={`font-bold text-base text-black lg:text-lg ${clsx({
                    "line-through font-normal text-slate-400": discount,
                  })}`}
                >
                  {getCurrencySign(price * 100)}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm py-1 leading-6">{description}</p>
              <div className="flex items-center gap-2 mt-3">
                <TagCount rate={rating} />
                <p className="text-sm">{stock} units in stock</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
