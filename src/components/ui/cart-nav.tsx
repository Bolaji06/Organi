'use client';

import { ShoppingCart, Heart, CircleUserRound } from "lucide-react"
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { Button } from "./button";
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/context/cartContext";

export function Cart(){
    const { cartCounter } = useContext(CartContext)

    return (
        <>
            <div
            
            className="cart relative">
                        <ShoppingCart size={20} color="black"/>
                       
                         <div className="count text-center absolute bg-primary w-4 h-4 rounded-full
                            -top-2 -right-3">
                                <p className="text-white text-xs text-center 
                                    font-extrabold">
                                    { cartCounter }
                                </p>
                        </div>
            </div>
        </>
    )
}

export function CartTotal(){
    return (
        <>
            <div className="item-amount hidden md:block">
                        <p className="text-slate-500">item: <span className="text-black text-sm font-extrabold">$129</span></p>
            </div>
        </>
    )
}

export function LikeProduct(){
    const { favoriteCounter } = useContext(CartContext)
    
    return (
        <>
            <div className="liked-product relative">

                        <Heart size={20} color="black"/>
                        {
                            (<div className="count text-center absolute bg-primary w-4 h-4 rounded-full
                            -top-2 -right-3">
                                <p className="text-white text-xs text-center 
                                font-extrabold">{favoriteCounter}</p>
                        </div>)}
            </div>
        </>
    )
}

export function UserAvatar(){
    const { data: session, status } = useSession();
    const userImage = session?.user?.image
    const username = session?.user?.name ?? '';
    const userEmail = session?.user?.email ?? '';

    const router = useRouter()
    
    return (
        <>

            <HoverCard>
            <HoverCardTrigger className="cursor-pointer">
               {
                userImage ? 
                (<Image 
                    src={userImage}
                    alt='User Profile'
                    width={100}
                    height={100}
                    className="w-8 h-8 rounded" />) :
                    <CircleUserRound color="black" size={26} />
               } 
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex gap-6">
                    <div>
                       { userImage && <Image 
                            src={userImage}
                            width={100}
                            height={100}
                            alt="User Image"
                            className="w-8 h-8 rounded object-cover"/> 
                            }
                    </div>
                    <div>
                        <h3 className="font-semibold">{username}</h3>
                        <p className="py-1 text-sm">{userEmail}</p>
                    </div>
                </div>
                <div className="mt-2">
                    { status === 'authenticated' ? (<Button onClick={()=> signOut()} className="w-full">Sign Out</Button>) :
                        <Button onClick={() => router.push('/signin')} className="w-full">Sign In</Button>
                    }
                </div>
            </HoverCardContent>
            </HoverCard>
        </>
    )
}