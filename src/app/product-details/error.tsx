'use client';

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function Error({ error, reset }: 
    { error: Error & {digest?: string}, reset: () => void}){
        const router = useRouter();

        useEffect(() => {
            console.log(error)
        }, [error]);

    return (
        <>
            <main className="">
                <div className="relative h-screen">
                <div className="absolute w-full top-1/5 left-1/2 -translate-x-1/2 flex flex-col mt-20 justify-center items-center">
                    <XCircle color="red" size={50}/>
                    <p className="text-center py-6 text-3xl px-4 md:text-4xl font-semibold">Unable to retrieve product </p>
                    <Button className="mt-6 w-32 h-12 hover:bg-primary border-2 border-primary text-primary hover:text-white
                     font-semibold text-lg bg-transparent transition-colors ease-in-out duration-500" onClick={()=> router.back()}>Go Back</Button>
                </div>
                </div>
            </main>
        </>
    )
}