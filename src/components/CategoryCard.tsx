import { removeLastSfromCategory, categoryBg } from "@/lib/utils";

export default function CategoryCard({ name }: { name: string }) {
  return (
    <section className="relative rounded-md w-36 md:w-44 aspect-square">
      <p
        className="relative top-[40%] text-white font-semibold text-lg
               text-center capitalize px-2"
      >
        {removeLastSfromCategory(name)}
      </p>
    </section>
  );
}
