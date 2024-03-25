import { Skeleton } from "@/components/ui/skeleton";
import { cardSkeleton } from "@/lib/links";

export default function Loading() {
  const cardNumber = cardSkeleton.slice(0, 5)
  return (
    <>
      <main className="px-4 lg:px-14">
        <div>
          <Skeleton className="w-full h-[200px]" />
        </div>

        <div
          className="grid gap-4 my-14 "
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          }}
        >
          {cardNumber.map((item, index) => {
            return (
              <div key={index} className="bg-white rounded-md shadow-md">
                <div className="py-4 px-3">
                  <Skeleton className="w-full h-[220px]" />
                  <Skeleton className="w-[90%] h-4 mt-2" />
                  <Skeleton className="w-[70%] h-4 mt-2" />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
