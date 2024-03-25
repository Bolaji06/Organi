import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(){

    return (
        <>
            <main>
                <div className="grid gap-3 py-10 px-6 lg:grid-cols-[3fr,1fr]">
                    <Skeleton className="w-full h-[200px] lg:h-[400px]"/>
                    <Skeleton className="w-full h-[200px] lg:h-[400px]"/>

                </div>
            </main>
        </>
    )
}