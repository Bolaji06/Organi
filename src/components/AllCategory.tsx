import { getAllCategories } from "@/app/api/routes";
import CategoryCard from "./CategoryCard";
import { categoryBg } from "@/lib/utils";
import Link from "next/link";
import { resolve } from "path";

export default async function AllCategoryProduct() {
  const allCategory = await getAllCategories();

  return (
    <>
      <main className="px-4 lg:px-14 bg-slate-100 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 py-6">
          {allCategory.map((item: string, index: number) => {
            return (
              <Link
                href={`/category/${item}`}
                style={{ backgroundImage: `url(${categoryBg[index].src})` }}
                className="bg-no-repeat bg-cover bg-center relative rounded-md"
                key={item}
              >
                <div className="absolute inset-0 bg-black/50 rounded-md" />
                <CategoryCard name={item} />
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
