import { CartItemType } from "@/app/context/cartContext";

export interface CartContextType {
  cartItems: any[];
  cartCounter: number;
  addToCart: (item: any) => void;
  removeFromCart: (item: IProduct) => void;
  clearCart: () => void;
  getTotalCartItems: () => number;
  checkIsItemInCart: (item: IProduct) => boolean;
  productData: any;
  setProductData: (data: any) => void;
  removeItemFromList: (index: number) => void;
  addToFavorite: (item: IProduct) => void;
  checkIsItemInFavorite: (item: IProduct) => boolean;
  removeFromFavorite: (item: IProduct) => void;
  favoriteCounter: number;
  favoriteItems: [];
  clearFavorite: () => void;
  removeFromFavoriteList: (index: number) => void;
  recentViewedProducts: number[];
  setRecentViewedProducts: (prevState: number[]) => void;
  quantity: number,
  increaseQuantity: (item: IProduct) => void,
  decreaseQuantity: (item: IProduct) => void
  getTotalQuantity: () => number,
  getTotalPriceWithQuantity: () => number,
  addToFavoriteCartList: (item: IProduct) => void
}

export interface ISearchProduct {
  products: [
    {
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
    }
  ];
}

export interface IProduct {
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
}
export interface IProductWithQuantity {
  item: {
    quantity: number;
    item: IProduct;
  };
}
export type Product = {
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
}

export interface IForm {
  fullName: string,
  phoneNumber: string,
  address: string,
  lga: string,
  state: string,
}
