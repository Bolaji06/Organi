import { getCategoryProduct } from "@/app/api/routes";
import NavBar from "@/components/NavBar";
import Image from "next/image";

import { ProductCard } from "@/components/ProductCard";

import jewelryBanner from "../../../../public/assets/jewlery banner.jpg";
import { AdsCarousel } from "@/components/Carousel";
import {
  womenAdsCarousel,
  jewleryAdsCarousel,
  electronicAdsCarousel,
  menAdsCarousel,
} from "@/lib/carousel-data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { IProduct } from "@/lib/definitions";

export async function generateMetadata({
  params,
}: {
  params: { type: string };
}): Promise<Metadata> {
  return {
    title: params.type,
    description: `Category for ${params.type}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { type: string };
}) {
  const productCategoryData = await getCategoryProduct(params.type);
  const products = productCategoryData?.products;

  if (!products.length) {
    notFound();
  }

  return (
    <>
      <main className="px-4 lg:px-14">
        <section className="">
          <AdsCarousel autoScroll={true} slides={electronicAdsCarousel} />
        </section>

        <main
          className="grid gap-4 my-14 "
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          }}
        >
          {products.map((product: IProduct) => {
            return (
              <Link key={product.id} href={`/product-details/${product.id}`}>
                <ProductCard
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.images[0]}
                  rate={product.rating}
                  discount={product.discountPercentage}
                />
              </Link>
            );
          })}
        </main>
      </main>
    </>
  );
}
