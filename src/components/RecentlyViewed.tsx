"use client";
import { getSingleProductDetail } from "@/app/api/routes";
import { CartContext } from "@/app/context/cartContext";
import { IProduct } from "@/lib/definitions";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";

export default function RecentlyViewedProduct() {
  const [recentData, setRecentData] = useState([]);
  const { recentViewedProducts } = useContext(CartContext);

  useEffect(() => {
    async function getData() {
      if (recentViewedProducts) {
        const data = await Promise.all(
          recentViewedProducts.map((item: number) => {
            return getSingleProductDetail(item);
          })
        );
        //@ts-ignore
        setRecentData(data);
      } else {
        setRecentData([]);
      }
    }
    getData();
  }, [recentViewedProducts]);

  return (
    <>
      {recentData && (
        <main className="px-4">
          <h2 className="py-4 text-lg md:text-xl text-black font-semibold">
            Recently Viewed Products
          </h2>
          <section className={`flex gap-2 overflow-x-auto`}>
            {recentData.map((item: IProduct) => {
              return (
                <Link
                  key={item?.id}
                  href={`/product-details/${item.id}`}
                  className="mb-10"
                >
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                    className="w-40"
                  />
                </Link>
              );
            })}
          </section>
        </main>
      )}
    </>
  );
}
