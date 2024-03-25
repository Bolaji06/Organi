import { getSingleProductDetail } from "@/app/api/routes";

import { Suspense } from "react";

import Breadcrumbs from "@/components/breadcrumbs";
import Product from "@/components/Product";
import RecentlyViewedProduct from "@/components/RecentlyViewed";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { IProduct } from "@/lib/definitions";

// Generating a dynamic metadata for this page
export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const productData: IProduct = await getSingleProductDetail(params.id);

  return {
    title: productData.title,
    description: productData.description,
  };
}

// statically generate routes at build time instead of on-demand at request time.

// USING generateStaticParams: generateStaticParams should
// return an ARRAY of OBJECTS where each object represents
// the populated dynamic segments of a single route.

// Each property in the object is a dynamic segment to be filled in for the route.
// The properties name is the segment's name, and the properties value is what that
// segment should be filled in with.
export async function generateStaticParams() {
  const products = await fetch("https://dummyjson.com/products");
  const response = await products.json();
  const productList = response.products;

  return productList
    .map((item: IProduct) => ({
      id: item.id.toString(),
    }))
    .slice(0, 10); // generate the first 10 items at build time
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  const productData = await getSingleProductDetail(params.id);

  return (
    <>
      <main className="bg-slate-100 ">
        <header className="px-4 py-2">
          <Breadcrumbs
            breadcrumbs={[
              {
                label: "home",
                href: "/",
              },
              {
                label: "product-details",
                href: "/product-details",
                active: true,
              },
            ]}
          />
        </header>
        <Product data={productData} />
        <RecentlyViewedProduct />
      </main>
    </>
  );
}
