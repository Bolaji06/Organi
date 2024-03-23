"use client";

import { searchProduct } from "@/app/api/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import SearchProductCard from "./SearchProductCard";
import { SvgSpinnersEclipse } from "./client";
import Image from "next/image";
import Link from "next/link";

import noResult from "../../public/assets/no result.png";
import { Button } from "./ui/button";
import { ISearchProduct } from "@/lib/definitions";

export default function SearchResult() {
  const [data, setData] = useState<ISearchProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const params = useSearchParams();
  const query = params.get("query")?.toString();

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        setIsLoading(true);
        try {
          const data = await searchProduct(query);
          setData(data);
        } catch (error) {
          console.log(error);
          setError("Unable to fetch data");
          setData(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [query]);

  return (
    <>
      <main className="relative w-full">
        {error && <p>{error}</p>}

        {isLoading ? (
          <div className="mb-2 flex justify-center items-center">
            <SvgSpinnersEclipse />
          </div>
        ) : (
          <div
            className="rounded-full w-40 mx-auto flex justify-center items-center text-center
                 bg-green-200 mt-1 mb-3 px-3"
          >
            <p className="text-base font-bold">
              Found {data?.products?.length}{" "}
              {(data?.products?.length ?? 0) > 1 ? "items" : "item"}{" "}
            </p>
          </div>
        )}

        {!data?.products?.length ? (
          <div className="flex flex-col justify-center items-center">
            <Image
              width={300}
              height={300}
              src={noResult}
              alt="no reult"
              className="
                         w-[300px] aspect-square object-cover"
            />
            <h3 className="text-lg md:text-3xl">
              No result found for: &quot;{query}&quot;
            </h3>
            <p className="mt-2">Try another search</p>
            <p>Check your spelling or try search for a more generic term</p>
            <Link
              href={"/"}
              className="mt-5 py-2 px-6 font-medium shadow-md border border-primary
                        text-primary hover:bg-primary hover:text-white transition-all ease-in-out
                        duration-500
                        rounded-md  uppercase"
            >
              Go to homepage
            </Link>
          </div>
        ) : (
          data && (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {data?.products?.map((product) => {
                return (
                  <Link
                    key={product.id}
                    href={`/product-details/${product.id}`}
                  >
                    <SearchProductCard
                      key={product.id}
                      title={product.title}
                      image={product?.images}
                      description={product?.description}
                      price={product?.price}
                      rating={product?.rating}
                      stock={product?.stock}
                      discount={product?.discountPercentage}
                    />
                  </Link>
                );
              })}
            </section>
          )
        )}

        {}
      </main>
    </>
  );
}
