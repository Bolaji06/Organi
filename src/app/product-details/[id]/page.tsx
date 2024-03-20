import { getSingleProductDetail } from "@/app/api/routes";

import { Suspense } from "react";
import Loading from "./loading";

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
        <Suspense fallback={<Loading />}>
          <Product data={productData} />
        </Suspense>

        <RecentlyViewedProduct />
      </main>
    </>
  );
}
