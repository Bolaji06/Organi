
export interface CartContextType {
    cartItems: any[]; // adjust type as per your cart item structure
    cartCounter: number;
    addToCart: (item: any) => void; // adjust type as per addToCart function signature
    removeFromCart: (item: IProduct) => void; // adjust type as per removeFromCart function signature
    clearCart: () => void;
    getTotalCartItems: () => number;
    checkIsItemInCart: (item: IProduct) => boolean;
    productData: any; // adjust type as per your product data structure
    setProductData: (data: any) => void; // adjust type as per setProductData function signature
    removeItemFromList: (index: number) => void; // adjust type as per removeItemFromList function signature
    addToFavorite: (item: IProduct) => void; // adjust type as per addToFavorite function signature
    checkIsItemInFavorite: (item: IProduct) => boolean;
    removeFromFavorite: (item: IProduct) => void;
    favoriteCounter: number,
    favoriteItems: [],
    clearFavorite: () => void,
    removeFromFavoriteList: (index: number) => void,
    recentViewedProducts: number[];
    setRecentViewedProducts: (prevState: number[]) => void,
   
}

export interface ISearchProduct {
    products: [
        {
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
    ]
}

export interface IProduct {
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



