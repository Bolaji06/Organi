'use client'

import { IProduct, CartContextType } from "@/lib/definitions";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext<CartContextType>({} as CartContextType);

type ItemType = {
    id: number,
    title: string,
    price: number,
}
type CartItemType = {
    //quantity: number,
    item: {
        id: number,
        title: string,
        description: string,
        price: number,
        discountPercentage: number,
        rating: number,
        stock: number,
        brand: string,
        category: string,
        thumbnail: string,
        images: Array<string>
    }
}

const cartItemString = typeof window !== 'undefined' ? localStorage.getItem('cartItems') : null;
const initialCartItems = cartItemString ? JSON.parse(cartItemString) : [];

const itemCartCounterString = typeof window !== 'undefined' ? localStorage.getItem('cart-counter') : null;
const initialCartCounter = itemCartCounterString ? JSON.parse(itemCartCounterString) : 0

const favoriteItemsString = typeof window !== 'undefined' ? localStorage.getItem('favorite') : null;
const initialFavoriteList = favoriteItemsString ? JSON.parse(favoriteItemsString) : [];

const favoriteItemCounterString = typeof window !== 'undefined' ? localStorage.getItem('favorite-counter') : null;
const initialFavoriteCounter = favoriteItemCounterString ? JSON.parse(favoriteItemCounterString) : 0;

const recentlyViewedProductString = typeof window !== 'undefined' ? localStorage.getItem('rvp') : null;
const initialRecentlyViewedProduct = recentlyViewedProductString ? JSON.parse(recentlyViewedProductString) : [];


export function CartProvider({ children }: {children: React.ReactNode}){
   
    const [cartItems, setCartItems] = useState(initialCartItems );
    const [cartCounter, setCartCounter] = useState(initialCartCounter);
    const [productData, setProductData] = useState(null);
    const [favoriteItems, setFavoriteItems] = useState(initialFavoriteList);
    const [favoriteCounter, setFavoriteCounter] = useState<number>(initialFavoriteCounter);
    const [recentViewedProducts, setRecentViewedProducts] = useState<number[]>(initialRecentlyViewedProduct);


    function addToCart(item: ItemType){

        const isItemInCart = cartItems.find((cartItem: CartItemType) => cartItem?.item?.id === item.id);

        if (isItemInCart){
            setCartItems(cartItems.map((cartItem : CartItemType) => cartItem?.item?.id === item.id ? {
                cartItem,
                //quantity: cartItem.quantity + 1

            } : cartItem))
            
        }else {
            setCartItems([...cartItems, { item, quantity: 1 }])
        }
        setCartCounter(cartItems.length + 1);
    }

    function removeItemFromList(index: number){
        const updatedCartItems = cartItems.filter((cartItem: CartItemType, cartItemIndex: number) => cartItemIndex !== index);
        setCartItems(updatedCartItems);
        setCartCounter(updatedCartItems.length);
    }
    function removeFromFavoriteList(index: number){
        const updatedFavoriteItems = favoriteItems.filter((item: IProduct, favoriteIndex: number) => favoriteIndex !== index);
        setFavoriteItems(updatedFavoriteItems)
        
    }

    function removeFromCart(item: ItemType){
        // find item index to remove
        const itemIndex: number = cartItems.findIndex((cartItem: CartItemType) => cartItem?.item?.id === item.id);

        if (itemIndex !== -1) {
            const newCartItems = [...cartItems]; // create new cart items
            newCartItems.splice(itemIndex, 1); // Remove the item
            setCartItems(newCartItems);
            setCartCounter(cartItems.length - 1);
        } else {
            // Item not in cart, handle accordingly
        }
    }

    function checkIsItemInCart(item: IProduct){
        for (let cartItem of cartItems){
            if (JSON.stringify(cartItem?.item) === JSON.stringify(item)) return true;
        }
        return false;
    }


    function clearCart(){
        const emptyCart: [] = [];
        setCartItems(emptyCart);
        setCartCounter(emptyCart.length);
    }

    function getTotalCartItems(){
        if (cartItems.length){
            const totalPriceItems = cartItems.reduce((total: number, item: { item: { price: number}}) => total + item?.item?.price * 100, 0);
            return totalPriceItems
        }
        return 0;
    }

    function addToFavorite(item: ItemType){
       setFavoriteItems((prevState: ItemType[]) => {
        const isItemInFavorite = prevState.some(favItem => JSON.stringify(favItem) === JSON.stringify(item));
        if (!isItemInFavorite){
            setFavoriteCounter(favoriteItems.length + 1)
            return [...prevState, item];
        }
       })
    }
    function removeFromFavorite(item: ItemType){
        if (favoriteItems){
            const updatedFavoriteItem = favoriteItems.filter((favItem: ItemType) => favItem !== item)
            setFavoriteItems(updatedFavoriteItem);
            setFavoriteCounter(favoriteItems.length - 1);
        }else {
            return [];
        }
    }
    function checkIsItemInFavorite(item: ItemType): boolean{
        if (favoriteItems){
          for (let favItem of favoriteItems){
                if (JSON.stringify(favItem) === JSON.stringify(item)) return true;
            }
        }
        return false;    
    }
    function clearFavorite(){
        const emptyFavorite: [] = [];
        setFavoriteItems(emptyFavorite);
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cart-counter', JSON.stringify(cartCounter));
        localStorage.setItem('favorite', JSON.stringify(favoriteItems));
        localStorage.setItem('favorite-counter', JSON.stringify(favoriteCounter));
        localStorage.setItem('rvp', JSON.stringify(recentViewedProducts));
    }, [cartItems, cartCounter, favoriteItems, favoriteCounter, recentViewedProducts]);

    useEffect(() => {
        const isCartItem = localStorage.getItem('cartItems');
        const isCartCounter = localStorage.getItem('cart-counter');
        const isFavorite = localStorage.getItem('favorite');
        const isFavoriteCounter = localStorage.getItem('favorite-counter')
        const isRecentProduct = localStorage.getItem('rvp');
        
        if (isCartItem){
            setCartItems(JSON.parse(isCartItem));
        }
        if (isCartCounter){
            setCartCounter(JSON.parse(isCartCounter));
        }
        if (isFavorite){
            setFavoriteItems(JSON.parse(isFavorite));
        }
        if (isFavoriteCounter){
            setFavoriteCounter(JSON.parse(isFavoriteCounter));
        }
        if (isRecentProduct){
            setRecentViewedProducts(JSON.parse(isRecentProduct));
        }
        
    }, [])
   
    return (
        <>
            <CartContext.Provider value={{
                cartItems,
                cartCounter,
                addToCart,
                removeFromCart,
                clearCart,
                getTotalCartItems,
                checkIsItemInCart,
                productData,
                setProductData,
                removeItemFromList,
                addToFavorite,
                checkIsItemInFavorite,
                removeFromFavorite,
                favoriteCounter,
                favoriteItems,
                clearFavorite,
                removeFromFavoriteList,
                recentViewedProducts,
                setRecentViewedProducts,
                

            }}>

                { children }
            </CartContext.Provider>
        </>
    )
}