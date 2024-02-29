"use client";

import { Skeleton } from "./skeleton";
import Image from "next/image";
import { Button } from "./button";

export default function CartSkeleton() {
  return (
    <>
      <main className="">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr,1fr] gap-4 ">
          <div className="w-full px-3 rounded-md py-4 bg-slate-300 grid grid-cols-1 sm:grid-cols-[4fr,2fr,2fr]">
            <Skeleton className="w-32 h-4 rounded-sm bg-white hidden lg:block" />
            <Skeleton className="w-32 h-4 rounded-sm bg-white hidden lg:block" />
            <Skeleton className="w-32 h-4 ml-auto rounded-sm bg-white hidden lg:block" />

            <section className="flex lg:mt-10 gap-3 pt-2">
              <div>
                <Skeleton className="bg-white aspect-square w-32" />
              </div>
              <div>
                <div>
                  <Skeleton className="w-24 h-2 bg-white" />
                  <Skeleton className="mt-4 w-24 h-2 bg-white" />
                </div>
                <div className="mt-5">
                  <Skeleton className="bg-white w-24 h-8" />
                </div>
              </div>
            </section>
            <section className="mt-10">
              <Skeleton className="w-24 h-3 bg-white" />
            </section>
            <section className="flex justify-between mt-10">
              <Skeleton className="w-28 h-10 bg-white" />
              <Skeleton className="w-10 h-10 bg-white" />
            </section>
          </div>
          <Skeleton className="w-full h-52 bg-slate-300" />
        </div>
      </main>
    </>
  );
}
