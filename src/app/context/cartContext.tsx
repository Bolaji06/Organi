'use client'

import { createContext, useEffect, useState } from "react";

interface CartContextType {
    cartItems: any[]; // adjust type as per your cart item structure
    cartCounter: number;
    addToCart: (item: any) => void; // adjust type as per addToCart function signature
    removeFromCart: (item: ItemType) => void; // adjust type as per removeFromCart function signature
    clearCart: () => void;
    getTotalCartItems: () => number;
    checkIsItemInCart: (item: CartItemType) => boolean;
    productData: any; // adjust type as per your product data structure
    setProductData: (data: any) => void; // adjust type as per setProductData function signature
    removeItemFromList: (index: number) => void; // adjust type as per removeItemFromList function signature
    addToFavorite: (item: ItemType) => void; // adjust type as per addToFavorite function signature
}


export const CartContext = createContext<CartContextType>({} as CartContextType);

type ItemType = {
    id: number,
    title: string,
    price: number,
}
type CartItemType = {
    quantity: number,
    item: {
        id: number,
        price: number,
    }
}
const cartItemString = localStorage.getItem('cartItems');
const initialCartItems = cartItemString ? JSON.parse(cartItemString) : [];

const itemCartCounterString = localStorage.getItem('cart-counter');
const initialCartCounter = itemCartCounterString ? JSON.parse(itemCartCounterString) : 0

const favoriteItemsString = localStorage.getItem('favorite');
const initialFavoriteList = favoriteItemsString ? JSON.parse(favoriteItemsString) : [];


export function CartProvider({ children }: {children: React.ReactNode}){
   
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [cartCounter, setCartCounter] = useState(initialCartCounter);
    const [productData, setProductData] = useState(null);
    const [favoriteItems, setFavoriteItems] = useState(initialFavoriteList);

   


    function addToCart(item: ItemType){
        const isItemInCart = cartItems.find((cartItem: CartItemType) => cartItem?.item?.id === item.id);

        if (isItemInCart){
            setCartItems(cartItems.map((cartItem : CartItemType) => cartItem?.item?.id === item.id ? {
                cartItem,
                quantity: cartItem.quantity + 1

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

    function removeFromCart(item: ItemType){
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

    function checkIsItemInCart(item: CartItemType){
        for (let cartItem of cartItems){
            if (JSON.stringify(cartItem?.item) === JSON.stringify(item)) return true;
        }
        return false;
    }

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cart-counter', JSON.stringify(cartCounter));
       // localStorage.setItem('favorite', JSON.stringify(favoriteItems));
    }, [cartItems, cartCounter, favoriteItems]);

    useEffect(() => {
        const isCartItem = localStorage.getItem('cartItems');
        const isCartCounter = localStorage.getItem('cart-counter');
        const isFavorite = localStorage.getItem('favorite');
        
        if (isCartItem){
            setCartItems(JSON.parse(isCartItem));
        }
        if (isCartCounter){
            setCartCounter(JSON.parse(isCartCounter));
        }
        if (isFavorite){
            setFavoriteItems(isFavorite);
        }
    }, [])


    function clearCart(){
        const emptyCart: [] = [];
        setCartItems(emptyCart);
        setCartCounter(emptyCart.length);
    }

    function getTotalCartItems(){
        if (cartItems.length){
            const totalPriceItems = cartItems.reduce((total: number, item: { item: { price: number}}) => total + item.item.price * 100, 0);
            console.log(totalPriceItems);
            return totalPriceItems
        }
        return 0;
    }

    function addToFavorite(item: ItemType){
        //setFavoriteItems([...item])
    }


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

            }}>

                { children }
            </CartContext.Provider>
        </>
    )
}