import NavBar from "@/components/NavBar";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <>
      <section className="px-4 bg-slate-100 py-6">
        <div className="flex justify-between gap-10 flex-col lg:flex-row">
          <div className="basis-[70%] shadow-md px-4 py-6 bg-white rounded-md">
            <div className="flex flex-col md:flex-row gap-8 justify-start ">
              <div className="basis-[40%]">
                <Skeleton className="w-full aspect-square rounded-sm" />

                <div className="flex justify-between items-center mt-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-20 h-6 rounded-sm" />
                </div>
              </div>

              <div className="basis-[60%] mt-6 pr-10">
                <div className="title pb-2">
                  <Skeleton className="w-full h-2" />
                  <div className="py-3 flex items-center gap-6">
                    <Skeleton className="w-1/2 h-2" />
                  </div>
                </div>

                <div className="price border-b-2 border-b-slate-100 py-2 flex justify-between item-center">
                  <Skeleton className="w-32 h-2" />
                </div>
                <div className="description py-2">
                  <Skeleton className="w-full h-44" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-2 bg-white rounded-md basis-[30%] shadow-md">
            <h1 className="uppercase text-center text-sm border-b py-1 border-slate-200">
              Delivery & return
            </h1>

            <Skeleton className="w-full h-32 mt-6" />
            <Skeleton className="w-full h-14 mt-10" />
            <Skeleton className="w-full h-14 mt-4" />
          </div>
        </div>
      </section>
    </>
  );
}
