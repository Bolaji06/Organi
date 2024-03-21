import { IProduct } from "@/lib/definitions";
import { MetadataRoute } from "next";


export async function sitemap(): Promise<MetadataRoute.Sitemap>{
    const response = await fetch('https://dummyjson.com/products');
    const products = await response.json();

    const allProducts: MetadataRoute.Sitemap = products.map((item: IProduct) => ({
        url: `${process.env.NEXT_PUBLIC_ORGANI_URL}/product-details/${item.id}`,


    }))

    return [
       
        ...allProducts
    ]

}