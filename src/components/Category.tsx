import { getAllCategories } from "@/app/api/routes";

import gadget from "../../public/assets/smartphones.webp";
import jewlry from "../../public/assets/laptops.webp";
import menCloth from "../../public/assets/fragrance.webp";
import womenCloth from "../../public/assets/skincare.webp";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";

const categoryBgImages = [gadget, jewlry, menCloth, womenCloth];

export default async function Category() {
  const allCategory = await getAllCategories();
  const firstFourItems = allCategory.slice(0, 4);

  return (
    <>
      <section className="mb-20">
        <div className="py-16 flex flex-col justify-center items-center gap-3">
          <h1 className="font-extrabold text-xl md:text-2xl lg:text-3xl">
            Products Category
          </h1>
          <div className="w-40 h-1 bg-primary" />
          <Link
            href={"/all-category"}
            className="inline-flex items-center justify-center 
                    gap-2 hover:text-primary transition-colors duration-200 ease-in-out"
          >
            View All <ChevronsRight />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 place-items-center">
          {categoryBgImages.map((bgImage, index) => {
            return (
              <div
                key={index}
                style={{ backgroundImage: `url(${bgImage.src})` }}
                className="w-40 lg:w-52 aspect-square relative flex justify-center items-center bg-center
                                bg-cover bg-no-repeat"
              >
                <div className="absolute inset-0 bg-black/50" />
                <Suspense fallback={<h2>Loading Category...</h2>}>
                  {firstFourItems.length > 0 && (
                    // <Link
                    //   href={`category/${firstFourItems[index]}`}
                    //   className="capitalize text-white font-semibold relative z-10 text-lg
                    //                                 tracking-normal lg:tracking-nav"
                    // >
                    //   {firstFourItems[index]}
                    // </Link>
                    <Link href={"/"}></Link>
                  )}
                </Suspense>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
