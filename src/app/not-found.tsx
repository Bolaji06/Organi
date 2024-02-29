import { Button } from "@/components/ui/button";
import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ['latin']});

export default function NotFound(){

    return (
        <>
            <main className="bg-lime-400 h-screen relative">
               <div className="text-center w-full absolute top-1/4 left-1/2 -translate-x-1/2">
                <h1 className={`${montserrat.className} font-semibold text-5xl md:text-8xl`}>404</h1>
                <p className="text-3xl font-semibold pt-3 pb-9">Page Not Found</p>
                <Link
                    href={'/'}
                    className="py-2 px-20 border-2 border-white text-white rounded-md mt-4 font-semibold text-lg
                    hover:bg-white hover:text-lime-500 transition-colors ease-in-out duration-500">
                    Back Home
                </Link>
               </div>
            </main>
        </>
    )
}