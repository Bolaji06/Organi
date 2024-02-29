import TopLevel from "@/components/TopLevel";
import { searchProduct } from "../api/routes";
import SearchResult from "@/components/SearchResult";
import { Suspense } from "react";
import SearchLoader from "./loading";

export default async function SearchPage() {
  // const searchProd = await searchProduct()

  return (
    <>
      <main className="px-6">
        <TopLevel isContact={false} />
        <div className="py-2 pb-32 px-4 bg-slate-100 mt-6 w-full">
          <SearchResult />
        </div>
      </main>
    </>
  );
}
