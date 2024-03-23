import SearchResult from "@/components/SearchResult";
import { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Search",
};
export default function SearchPage() {
  return (
    <>
      <main className="px-6">
        <div className="py-2 pb-32 px-4 bg-slate-100 mt-6 w-full">
          <SearchResult />
        </div>
      </main>
    </>
  );
}
