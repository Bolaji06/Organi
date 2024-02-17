import NavBar from "@/components/NavBar";
import ProductDetailsSkeleton from "@/components/skeleton";

export default function BlogPage(){

    return (
        <>
            <main>
                This is the Blog Page
                <ProductDetailsSkeleton />
            </main>
        </>
    )
}