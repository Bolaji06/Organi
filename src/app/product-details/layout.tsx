import { Suspense } from "react";
import Loading from "./[id]/loading";

export default function ProductDetailsLayout({ children } : { children: React.ReactNode }){

    return (
        <>
            <main>
                {children}
            </main>
        </>
    )
}