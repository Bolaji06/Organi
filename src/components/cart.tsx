'use client'
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

type CartItem = {
    id: number,
    name: string,
    price: number,
    quantity: number,
}
type Item = {
    id: number,
    name: string,
    price: number,
}

export function CartProvider({ children }: { children: React.ReactNode}){
    //const initialCartItem = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    const [cartItems, setCartItems] = useState([]);

    function addToCart(item: Item){
        // const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

        // if (isItemInCart){
        //     setCartItems(cartItems.map((cartItem) => cartItem.id === item.id ? {
        //         cartItem,
        //         quantity: cartItem.quantity + 1
        //     } : cartItem))
        // }else {
        //     setCartItems([...cartItems, { item, quantity: 1 }])
        // }
        //console.log(cartItems)
    }
    function removeFromCart(item: Item){
        // const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
        // if (isItemInCart.quantity === 1){
        //     setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
        // }else {
        //     setCartItems(
        //         cartItems.map((cartItem) => 
        //             cartItem.id === item.id ?
        //              { ...cartItems, quantity: cartItem.quantity - 1}
        //               : cartItem))
        // }
    }

    function clearCart(){
        setCartItems([]);
    }
    function getCartTotal(){
        return cartItems.reduce((total:number, item) => total + item.price * item.quantity, 0)
    }

    // useEffect(() => {
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems))
    // }, []);


    // useEffect(() => {
    //     const cartItems = localStorage.getItem('cartItems');
    //     if (cartItems){
    //         setCartItems(JSON.parse(cartItems));
    //     }
    // }, []);

    return (
        <CartContext.Provider
        value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            getCartTotal,
        }}>
            { children }
        </CartContext.Provider>
    )

}