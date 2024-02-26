'use client';

import { DropdownMenuGroup, } from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import { Cart, LikeProduct } from "./cart-nav";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { useContext } from "react";
import { CartContext } from "@/app/context/cartContext";
import Image from "next/image";
import { getCurrencySign } from "@/lib/utils";

import emptyCart from '../../../public/assets/empty-cart.png'
import Link from "next/link";
import { AlertDialogPopOver } from "../AlertDialog";
import { IProduct } from "@/lib/definitions";
import { HeartCrack } from "lucide-react";
export default function LikeDropdowmn(){
    const { favoriteItems, clearFavorite, removeFromFavoriteList } = useContext(CartContext);

    return (
        <>
            <main>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="p-0 bg-transparent">
                            <LikeProduct />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        {favoriteItems?.length ? <DropdownMenuLabel className="flex justify-between items-center">
                            <p>Favorite Products</p>

                            <AlertDialogPopOver 
                                action={clearFavorite}
                                title="Clear Favorite"
                                description="This action cannot be undone. This will permanently 
                                            remove all items from your favorite item list."
                            />

                            </DropdownMenuLabel>
                                 : null}
                        <DropdownMenuGroup className="w-[270px] max-h-72 h-full overflow-y-scroll overflow-x-hidden mr-0">
                            {
                                favoriteItems?.map((item: IProduct, index: number) => {
                                   return( 
                                    <div key={index}>
                                         <DropdownMenuItem key={index}>
                                            <div className="flex justify-between w-full">
                                            <div className="flex gap-2 items-center">
                                                <Image 
                                                    width={600}
                                                    height={600}
                                                    src={item?.images[0]}
                                                    alt="cart item image"
                                                    className="w-8 h-8 rounded-full"/>
                                                <div>
                                                    <h2 className="font-semibold capitalize">{item?.title}</h2>
                                                    <p>{getCurrencySign(item?.price * 100)}</p>
                                                </div>
                                            </div>
                                            <Button onClick={() => removeFromFavoriteList(index)} className="bg-transparent hover:bg-primary hover:text-white text-primary">Remove</Button>
                                        </div>
                                       </DropdownMenuItem>
                                       <DropdownMenuSeparator className="px-2"/>
                                    </div>
                                      

                                    )
                                })
                               
                            }
                        
                        </DropdownMenuGroup>
                        <DropdownMenuItem>
                            {!favoriteItems?.length &&
                            (<div className="w-full flex flex-col justify-center items-center">
                                
                                    <HeartCrack size={120} color="#D3D3D3"/>
                                    <p className="text-lg">Favorite is empty</p>
                                    
                            </div>)}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    
                </DropdownMenu>
            </main>
        </>
    )
}