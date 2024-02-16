import Image from "next/image"

import { Star } from "lucide-react"
import { getDiscountPrice, getCurrencySign } from "@/lib/utils"
import TagCount from "./ui/tag"
import clsx from "clsx";

interface ProductC  {
    id: number,
    title: string,
    price: number,
    image: string,
    rate: number,
    discount: number,

}

export function ProductCard({ id, title, price, image, rate, discount}: ProductC){

    const discountPrice = getDiscountPrice(price, discount);
    const discountFormat = getCurrencySign(discountPrice);

    return (
        <>
            <main className="">
                <div className="rounded-md px-2 py-1 bg-white w-40 transition-scale duration-500 ease-in-out
                shadow-md hover:shadow-xl hover:scale-105">
                    <div className="flex justify-center items-center relative">
                        <div className="absolute top-0 right-0 p-1 text-xs text-white bg-red-500 rounded-sm">
                            {`-${Math.round(discount)}%`}
                        </div>
                        <Image 
                            width={100}
                            height={100}
                            src={image}
                            alt="Product Image"
                            className="object-cover aspect-square w-full"/>
                           
                    </div>

                    <div className="mt-4 px-1">
                        {/* Product Name an price */}
                        <h3 className="truncate capitalize overflow-hidden pb-2">{title}</h3>
                        {discount ? <p className="font-semibold">{discountFormat}</p> : ''}
                        <div className="flex justify-between">
                               <p className={`text-semibold ${clsx({'line-through font-normal text-sm text-gray-400' : discount !== null})}`}>{getCurrencySign(price * 100)}</p>
                            <TagCount rate={rate} />
                        </div>
                        
                        
                    </div>


                </div>
            </main>
        </>
    )
}