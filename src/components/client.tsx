'use client'

import { shopStore } from "@/app/store/shop-store"
import { Button } from "./ui/button"
import { ShoppingCart, Heart, Github } from "lucide-react"
import useStore from "@/app/store/useStore"
import { signIn } from "next-auth/react"
import { useContext, useState } from "react"
import Image from "next/image"
import { useToast } from "./ui/use-toast";
import { ProductType } from "./Product"

type CartBtnProps = {
    data: {},
}

// List of all NavBar Components
export function GitHubLoginButton({ name, providerId}){

    return (
        <>
            <Button className="w-full flex gap-2 font-semibold" onClick={()=>
                 signIn(providerId, { callbackUrl: '/'})}>
                    <Github color="black"/>{name}</Button>
        </>
    )
}

//List of Products Details components
export function AddToCartButton({ data } : CartBtnProps){
    const { toast } = useToast();
    const { addToCart } = useContext(CartContext)

    function handleAddToCart(){        
        addToCart(data);
        toast({
            variant: 'primary',
            title: 'Sucess!!!',
            description: 'Item is Added to cart view in cart',
            action: <ToastAction altText="Cart">View Cart</ToastAction>
        })
    }
    return (
        <>
            <Button onClick={handleAddToCart} className="bg-primary uppercase font-semibold group">
                <ShoppingCart className="mr-4 group-hover:animate-bounce"/> Add to cart
            </Button>
            
        </>
    )
}

export function RemoveFromCart( {  data } : CartBtnProps){
    const { toast } = useToast();
    const { removeFromCart } = useContext(CartContext)

    function handleAddToCart(){        
        removeFromCart(data);
        toast({
            variant: 'primary',
            title: 'Sucess!',
            description: 'Item is removed to cart view in cart',
            action: <ToastAction altText="Cart">View Cart</ToastAction>
        });
    }
    return (
        <>
            <Button onClick={handleAddToCart} className="bg-primary uppercase font-semibold group">
                <ShoppingCart className="mr-4 group-hover:rotate-180 transition-rotate duration-700 ease-in-out"/> Remove from cart
            </Button>
            
        </>
    )
}

export function AddToFavoriteButton( ) {
   
    return (
        <>
            <Button className="bg-transparent">
                <Heart size={25} color="green" fill="green"/>
            </Button>
        </>
    )
}

export function ProductImageSwitch({ images }: { images: []}){
    const [curIndex, setCurIndex] = useState(0);

   return (
    <>
        <div>
            <Image 
                src={images[curIndex]}
                width={100}
                height={100}
                alt="product image"
                priority={true}
                className="w-full object-cover aspect-square rounded-md
                transition-all ease-in-out duration-300"/>

            <div>
                <div className="flex gap-6 w-full">
                    {
                        images.map((item: string, index: number) => (
                            <div key={item} className="focus:ring-2 focus:ring-red-600
                            focus:outline-8 focus:border-4">
                                <Image 
                                key={item}
                                src={item}
                                alt="image"
                                width={100}
                                height={100}
                                onClick={() => setCurIndex(index)}
                                className="mt-6 w-8 aspect-square
                                hover:border cursor-pointer 
                                 hover:border-gray-700"/>
                            </div>
                            
                        ))
                    }
                    </div>
                </div>
        </div>
    </>
   )
}

// Infinite Spinner component
import React from 'react';
import type { SVGProps } from 'react';
import { ToastAction } from "./ui/toast"
import { CartContext } from "@/app/context/cartContext"

export function SvgSpinnersEclipse(props: SVGProps<SVGSVGElement>) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" {...props}><path fill="#7fad39" d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"><animateTransform attributeName="transform" dur="0.6s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></path></svg>);
}