"use client";

import { IProduct, CartContextType } from "@/lib/definitions";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

type ItemType = {
  id: number;
  title: string;
  price: number;
};
export type CartItemType = {
  quantity: number;
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: Array<string>;
  };
};

const cartItemString =
  typeof window !== "undefined" ? localStorage.getItem("cartItems") : null;
const initialCartItems = cartItemString ? JSON.parse(cartItemString) : [];

const itemCartCounterString =
  typeof window !== "undefined" ? localStorage.getItem("cart-counter") : null;
const initialCartCounter = itemCartCounterString
  ? JSON.parse(itemCartCounterString)
  : 0;

const favoriteItemsString =
  typeof window !== "undefined" ? localStorage.getItem("favorite") : null;
const initialFavoriteList = favoriteItemsString
  ? JSON.parse(favoriteItemsString)
  : [];

const favoriteItemCounterString =
  typeof window !== "undefined"
    ? localStorage.getItem("favorite-counter")
    : null;
const initialFavoriteCounter = favoriteItemCounterString
  ? JSON.parse(favoriteItemCounterString)
  : 0;

const recentlyViewedProductString =
  typeof window !== "undefined" ? localStorage.getItem("rvp") : null;
const initialRecentlyViewedProduct = recentlyViewedProductString
  ? JSON.parse(recentlyViewedProductString)
  : [];
const quantityCounterString =
  typeof window !== "undefined" ? localStorage.getItem("quantity") : null;
const initialQuantity = quantityCounterString
  ? JSON.parse(quantityCounterString)
  : 0;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [cartCounter, setCartCounter] = useState(initialCartCounter);
  const [productData, setProductData] = useState(null);
  const [favoriteItems, setFavoriteItems] = useState(initialFavoriteList);
  const [favoriteCounter, setFavoriteCounter] = useState<number>(
    initialFavoriteCounter
  );
  const [recentViewedProducts, setRecentViewedProducts] = useState<number[]>(
    initialRecentlyViewedProduct
  );
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  function addToCart(item: IProduct) {
    const isItemInCart = cartItems.find(
      (cartItem: CartItemType) => cartItem?.item?.id === item.id
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem: CartItemType) =>
          cartItem?.item?.id === item.id
            ? {
                cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      setCartItems((prevState: []) => [...prevState, { item, quantity: 1 }]);
    }
    setCartCounter((prevState: number) => prevState + 1);
  }

  function removeItemFromList(index: number) {
    const updatedCartItems = cartItems.filter(
      (cartItem: CartItemType, cartItemIndex: number) => cartItemIndex !== index
    );
    setCartItems(updatedCartItems);
    setCartCounter(updatedCartItems.length);
  }
  function removeFromFavoriteList(index: number) {
    const updatedFavoriteItems = favoriteItems.filter(
      (item: IProduct, favoriteIndex: number) => favoriteIndex !== index
    );
    setFavoriteItems(updatedFavoriteItems);
  }

  function removeFromCart(item: ItemType) {
    // find item index to remove
    const itemIndex: number = cartItems.findIndex(
      (cartItem: CartItemType) => cartItem?.item?.id === item.id
    );

    if (itemIndex !== -1) {
      const newCartItems = [...cartItems]; // create new cart items
      newCartItems.splice(itemIndex, 1); // Remove the item
      setCartItems(newCartItems);        
      setCartCounter(cartItems.length - 1);
    } else {
      // Item not in cart, handle accordingly
    }
  }

  function checkIsItemInCart(item: IProduct) {
    for (let cartItem of cartItems) {
      if (JSON.stringify(cartItem?.item) === JSON.stringify(item)) return true;
    }
    return false;
  }

  function clearCart() {
    const emptyCart: [] = [];
    setCartItems(emptyCart);
    setCartCounter(emptyCart.length);
  }

  function getTotalCartItems() {
    if (cartItems.length) {
      const totalPriceItems = cartItems.reduce(
        (total: number, item: { item: { price: number } }) =>
          total + item?.item?.price * 100,
        0
      );
      return totalPriceItems;
    }
    return 0;
  }

  function getTotalQuantity(){
    if (cartItems.length){
      const totalQuantity = cartItems.reduce((total: number, item: { quantity: number}) => 
      total + item?.quantity, 0);
      return totalQuantity;
    }
    return 0;
  }
  function getTotalPriceWithQuantity(){
    if (cartItems.length){
      const totalPrice = cartItems.reduce((total: number, item: { quantity: number, item : {price: number}}) => 
      total + (item?.item?.price) * item?.quantity, 0);
      return totalPrice;
    }
    return 0
  }

  function addToFavorite(item: ItemType) {
    setFavoriteItems((prevState: ItemType[]) => {
      const isItemInFavorite = prevState.some(
        (favItem) => JSON.stringify(favItem) === JSON.stringify(item)
      );
      if (!isItemInFavorite) {
        setFavoriteCounter(favoriteItems.length + 1);
        return [...prevState, item];
      }
    });
  }

  function addToFavoriteCartList(item: ItemType){
    setFavoriteItems((prevState: ItemType[]) => {
      prevState.map((favItem) => {
        if (favItem.id === item.id){
          const isItemInFavorite = prevState.some((sItem: ItemType) => 
          JSON.stringify(sItem) === JSON.stringify(item));
          if (!isItemInFavorite){
            setFavoriteCounter(favoriteItems.length + 1);
            return [...prevState, item]
          }
        }
      })
    })
  }

  function removeFromFavorite(item: ItemType) {
    if (favoriteItems) {
      const updatedFavoriteItem = favoriteItems.filter(
        (favItem: ItemType) => favItem !== item
      );
      setFavoriteItems(updatedFavoriteItem);
      setFavoriteCounter(favoriteItems.length - 1);
    } else {
      return [];
    }
  }
  /**
   * Checks if an item is in the favorite items list.
   *
   * @param item - The item to check if it is in the favorite items list.
   * @returns `true` if the item is in the favorite items list, `false` otherwise.
   */
  function checkIsItemInFavorite(item: ItemType): boolean {
    if (favoriteItems) {
      for (let favItem of favoriteItems) {
        if (JSON.stringify(favItem) === JSON.stringify(item)) return true;
      }
    }
    return false;
  }

  /**
   * Clear all favorite item from the list
   */
  function clearFavorite() {
    const emptyFavorite: [] = [];
    setFavoriteItems(emptyFavorite);
  }

  function increaseQuantity(item: IProduct) {
    /**
     * Increases the quantity of a specific item in the cart.
     *
     * @param item - The item to increase the quantity of.
     * @returns None. The function only updates the cart items state.
     */
    const isItemInCart = cartItems.find(
      (cartItem: CartItemType) => cartItem.item?.id === item.id
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem: CartItemType) =>
          cartItem.item?.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    }
  }
  function decreaseQuantity(item: ItemType) {
    /**
     * This function decrease the quantity of item in the cart
     * @param Item
     * @returns None - It only updates the items in the cart
     * 
     */
    const isItemInCart = cartItems.find(
      (cartItem: CartItemType) => cartItem.item?.id === item.id
    );

    if (isItemInCart.quantity !== 1) {
      setCartItems(
        cartItems.map((cartItem: CartItemType) =>
          cartItem.item.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem
        )
      );
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cart-counter", JSON.stringify(cartCounter));
    localStorage.setItem("favorite", JSON.stringify(favoriteItems));
    localStorage.setItem("favorite-counter", JSON.stringify(favoriteCounter));
    localStorage.setItem("rvp", JSON.stringify(recentViewedProducts));
    localStorage.setItem("quantity", JSON.stringify(quantity));
  }, [
    cartItems,
    cartCounter,
    favoriteItems,
    favoriteCounter,
    recentViewedProducts,
    quantity,
  ]);

  useEffect(() => {
    /**
     * This useEffect hook is used to update the state of the following
     * cartItems, cartCounter, favorite, favorite counter, recent products and quantity
     * @param cartItems - the current cart item in the localStorage
     * @param isCartCounter - the current cart counter in the localStorage
     * @param isFavorite - the current favorite item in the localStorage
     * @param isFavoriteCounter - the current favorite counter in the localStorage
     * @param isRecentProduct - the current items in the localStorage
     *@returns None - the useEffect only updates the setSate of each items if each value is available
     */
    const isCartItem = localStorage.getItem("cartItems");
    const isCartCounter = localStorage.getItem("cart-counter");
    const isFavorite = localStorage.getItem("favorite");
    const isFavoriteCounter = localStorage.getItem("favorite-counter");
    const isRecentProduct = localStorage.getItem("rvp");
    const isQuantity = localStorage.getItem("quantity");

    if (isCartItem) {
      setCartItems(JSON.parse(isCartItem));
    }
    if (isCartCounter) {
      setCartCounter(JSON.parse(isCartCounter));
    }
    if (isFavorite) {
      setFavoriteItems(JSON.parse(isFavorite));
    }
    if (isFavoriteCounter) {
      setFavoriteCounter(JSON.parse(isFavoriteCounter));
    }
    if (isRecentProduct) {
      setRecentViewedProducts(JSON.parse(isRecentProduct));
    }
    if (isQuantity) {
      setQuantity(JSON.parse(isQuantity));
    }
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{
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
          quantity,
          increaseQuantity,
          decreaseQuantity,
          getTotalQuantity,
          getTotalPriceWithQuantity,
          addToFavoriteCartList,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
