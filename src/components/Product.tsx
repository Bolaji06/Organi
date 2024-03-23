"use client";

import { Popsicle, Store, Truck } from "lucide-react";
import {
  deliveryService,
  getCurrencySign,
  getDeliveryDate,
  getDiscountPrice,
  location,
} from "@/lib/utils";
import TagCount from "@/components/ui/tag";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AddToCartButton,
  AddToFavoriteButton,
  ProductImageSwitch,
  RemoveFromCart,
  SvgSpinnersEclipse,
} from "@/components/client";
import clsx from "clsx";

import { Suspense, useContext, useEffect, useState } from "react";
import { CartContext } from "@/app/context/cartContext";
import { IProduct } from "@/lib/definitions";

/**
 * 
 * @param {Object} data - 
 The product data
 * @param {string} 
 data.title - The title of the product
 * @param {number} 
 data.price - The price of the product
 *@param {string}
 data.description - The description of the product
 *@param {string}
 data.category - The category of the product
 *@param {Array<string>}
  data.images - The product images
 *@param {number}
 data.rating - The product rating
 * @param {stock}
 data.stock - Total amount in stock
 * @param {number}
 data.discountPercentage - Product discount percentage
 * @returns {React.ReactElement} The rendered product component
 */
export default function Product({
  data,
}: {
  data: IProduct;
}): React.ReactElement | null {
  const {
    title,
    price,
    description,
    category,
    images,
    rating,
    stock,
    discountPercentage: discount,
  } = data;

  const priceDiscount = getCurrencySign(getDiscountPrice(price, discount));

  const { checkIsItemInCart, setProductData } = useContext(CartContext);

  const [hasMount, setHasMount] = useState(false);
  const { from, to } = getDeliveryDate();

  //console.log(deliveryDate);

  useEffect(() => {
    setHasMount(true);
  }, []);

  useEffect(() => {
    setProductData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <main>
        <section className="px-4 pt-1 pb-12">
          <div className="flex justify-between gap-10 flex-col lg:flex-row">
            <div className="basis-[70%] shadow-md px-4 py-6 bg-white rounded-md">
              <div className="flex flex-col md:flex-row gap-8 justify-start ">
                <div className="basis-[40%]">
                  <ProductImageSwitch images={images} />
                </div>

                <div className="basis-[60%] mt-6 pr-4 md:pr-10">
                  <div className="title border-b-2 border-b-slate-100 pb-2">
                    <p className="text-lg font-medium capitalize">{title}</p>
                    <div className="py-3 flex items-center gap-6">
                      <p className="text-slate-400 text-sm">
                        Category:{" "}
                        <span className="capitalize text-slate-700">
                          {category}
                        </span>
                      </p>
                      <TagCount rate={rating} />
                      <p className="text-sm">{stock} in stock</p>
                    </div>
                  </div>

                  <div className="price border-b-2 border-b-slate-100 py-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 ">
                    {discount && (
                      <p className="font-bold text-lg lg:text-2xl">
                        {priceDiscount}
                      </p>
                    )}

                    <div className="flex gap-5 items-center">
                      <p
                        className={`font-bold text-lg lg:text-2xl ${clsx({
                          "line-through text-gray-300 text-lg lg:text-2xl":
                            discount !== null,
                        })}`}
                      >
                        {getCurrencySign(price * 100)}
                      </p>
                      {discount && (
                        <div className="p-1 text-center text-xs text-white bg-red-500 rounded-sm">
                          <p>{`-${Math.round(discount)}%`}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="description py-2 border-b-2 border-slate-100">
                    <p className="first-letter:capitalize">{description}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <AddToFavoriteButton data={data} />
                    {hasMount ? (
                      <div>
                        {checkIsItemInCart(data) ? (
                          <RemoveFromCart data={data} />
                        ) : (
                          <AddToCartButton data={data} />
                        )}
                      </div>
                    ) : (
                      <SvgSpinnersEclipse />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2 bg-white rounded-md basis-[30%]">
              <div>
                <h1 className="uppercase text-center text-sm border-b py-1 border-slate-200">
                  Delivery & return
                </h1>

                <div className="px-2">
                  <div className="mt-2">
                    <div className="flex justify-start items-start gap-4">
                      <div className=" p-2">
                        <Store size={25} className="text-black/70" />
                      </div>
                      <div>
                        <h2 className="font-semibold pb-1">Pickup Station</h2>
                        <p className="text-sm">
                          Delivery Fees:{" "}
                          <span className="font-bold">
                            {getCurrencySign(500)}
                          </span>
                        </p>
                        <p className="text-sm">
                          Arriving at pickup station between
                          <span className="font-bold"> {from}</span> &{" "}
                          <span className="font-bold"> {to}</span> when you
                          order within next{" "}
                          <span className="font-bold">18hrs 56mins</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-8 justify-start items-start gap-4">
                      <div className="p-2">
                        <Truck size={25} className="text-black/70" />
                      </div>
                      <div>
                        <h2 className="font-semibold pb-1">Home Delivery</h2>
                        <p className="text-sm">
                          Delivery Fees:{" "}
                          <span className="font-bold">
                            {getCurrencySign(850)}
                          </span>
                        </p>
                        <p className="text-sm">
                          Ready for delivery between
                          <span className="font-bold"> {from}</span> &{" "}
                          <span className="font-bold"> {to}</span> when you
                          order within next{" "}
                          <span className="font-bold">18hrs 56mins</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="text-xs pt-6">
                <p>
                  <span className="font-bold">Delivery Policy</span>: We aim to deliver your orders within 3-5
                  business days domestically and 7-14 business days
                  internationally, though delivery times may vary.
                </p>
                <p className="py-4">
                  <span className="font-bold">Return Policy</span>: You can return unused items in their original
                  packaging within 30 days for a full refund or exchange;
                  returns are typically processed within 5-7 business days of
                  receipt.
                </p>
              </footer>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
