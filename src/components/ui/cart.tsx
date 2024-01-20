'use client';

import { ShoppingCart, Heart } from "lucide-react"

export function Cart(){

    return (
        <>
            <div className="cart relative">
                        <ShoppingCart size={20}/>
                        <div className="count text-center absolute bg-primary w-4 h-4 rounded-full
                            -top-2 -right-3">
                                <p className="text-white text-xs text-center 
                                font-extrabold">0</p>
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

    return (
        <>
            <div className="liked-product relative">
                        <Heart size={20}/>
                        <div className="count text-center absolute bg-primary w-4 h-4 rounded-full
                            -top-2 -right-3">
                                <p className="text-white text-xs text-center 
                                font-extrabold">0</p>
                        </div>
            </div>
        </>
    )
}