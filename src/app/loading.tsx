import { Loader2 } from "lucide-react";

export default function Loading(){

    return (
        <>
            <main className="h-screen">
               <div className="absolute inset-0 bg-black/50"/>

               <div className="w-screen h-screen flex justify-center items-center align-middle">

                <Loader2 size={40} color="white" className="animate-spin"/>
               </div>
            </main>
        </>
    )
}