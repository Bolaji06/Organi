"use client";
import { ChevronDown, Menu, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { dropDownCategory } from "@/lib/links";
import Link from "next/link";

export function SearchInput() {
  const [searchText, setSearchText] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }
  function handleSearch() {
    router.push(`/search?query=${encodeURIComponent(searchText)}`);
    // const params = new URLSearchParams(searchParams);
    // if (searchText){
    //     params.set('query', searchText);
    // }else{
    //     params.delete('query');
    // }
    // router.replace(`${pathname}/search?${params.toString()}`)
  }

  useEffect(() => {
    const searchWithKey = (e: any) => {
      if (searchText && e.key === "Enter") {
        handleSearch();
      }
    };
    window.addEventListener("keydown", searchWithKey);
    return () => window.removeEventListener("keydown", searchWithKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  return (
    <>
      <main>
        <div className="flex w-full items-center justify-center">
          <Input
            placeholder="What do you need?"
            type="search"
            value={searchText}
            name={searchText}
            onChange={handleChange}
            defaultValue={searchParams.get("query")?.toString()}
            className="w-[400px] lg:w-[600px] min-w-0 rounded-none py-6 border-slate-300 focus-visible:ring-0
                            placeholder:text-slate-500 text-base focus:border focus:border-green-500"
          />
          <Button
            onClick={() => handleSearch()}
            className="bg-primary py-6 outline
                                rounded-none font-semibold uppercase"
          >
            Search
          </Button>
        </div>
      </main>
    </>
  );
}

export function CategoryTab() {
  return (
    <>
      <section>
        <div>
          {dropDownCategory.map((category) => {
            return (
              <div
                key={category.name}
                className=" hover:bg-white cursor-pointer group"
              >
                <Link
                  href={`/category/${category.href}`}
                  className="w-full flex gap-3 items-center"
                >
                  <category.icon
                    size={20}
                    className="text-black/80 group-hover:text-primary"
                  />
                  <p className="text-sm text-black/80 group-hover:text-primary
                   group-hover:font-semibold group-hover:text-base py-[7px]">
                    {category.name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
