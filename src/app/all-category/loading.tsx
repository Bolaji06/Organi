import { Skeleton } from "@/components/ui/skeleton";
import { cardSkeleton } from "@/lib/links";

export default function Loading(){

    return (
        <>
            <main className="px-4 lg:px-14 bg-slate-100 ">
                <div className="flex flex-wrap items-center justify-center gap-2 py-6">
                    {
                        cardSkeleton.map((item, index) => {
                            return (
                                <Skeleton key={index} className="w-36 md:w-44 aspect-square"/>
                            )
                        })
                    }

                </div>

            </main>
        </>
    )
}