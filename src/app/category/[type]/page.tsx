import { getCategoryProduct } from "@/app/api/routes";
import NavBar from "@/components/NavBar";
import Image from "next/image";

import { ProductCard } from '@/components/ProductCard'

import jewelryBanner from '../../../../public/assets/jewlery banner.jpg'
import { AdsCarousel } from "@/components/Carousel";
import { womenAdsCarousel, jewleryAdsCarousel,
     electronicAdsCarousel, menAdsCarousel } from "@/lib/carousel-data";
import Link from "next/link";

export default async function CategoryPage({ params } : { params: { type: string}}){

    const productCategoryData = await getCategoryProduct(params.type);
    const products = productCategoryData?.products

    //const URIpath = decodeURI(params.type)

    return (
        <>
            <main className="px-4 lg:px-14">
                   <section className="">
                       <AdsCarousel 
                        autoScroll={true}
                        slides={electronicAdsCarousel}/>
                    </section>
                       

                        <main className="flex justify-center items-start lg:justify-evenly flex-wrap gap-4 my-20">
                            {
                                products.map((product: any) => {
                                    return (
                                        <Link 
                                            key={product.id}
                                            href={`/product-details/${product.id}`}>
                                                 <ProductCard 
                                                    id={product?.id}
                                                    title={product?.title}
                                                    price={product?.price}
                                                    image={product?.images[0]}
                                                    rate={product?.rating}
                                                    discount={product?.discountPercentage} />
                                        </Link>
                                    )
                                })
                            }
                        </main>
                
                  
            </main>
        </>
    )
}