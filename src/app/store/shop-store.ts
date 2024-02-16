
import { CarIcon } from 'lucide-react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


type TStore = {
    cartCounter: number,
    favouriteCounter: number,
    isFavorite: boolean,
    addToCartCounter: () => number,
    addToFavoriteCounter: () => number,
    toggleFavorite: () => boolean,

}

// export const useStore = create((set) => (persist(
//     (set, get) => ({
//         cartCounter: 0,
//         addToCartCounter: () => set({ cartCounter: get().cartCounter + 1 }),
//     }), { name: 'cart',
//         storage: createJSONStorage(()=> localStorage)}),
//     {
//         favouriteCounter: 0,
//         isFavorite: false,
//         addToFavoriteCounter: () => set((state: any) => ({ favouriteCounter: state.favouriteCounter + 1 })),
//         toggleFavorite: () => set((state: any) => ({ isFavorite: !state.isFavorite })),
//     }
// ))

export const shopStore = create(persist((set, get) => ({
    cartCounter: 0,
    addToCart: () => set({ cartCounter: get().cartCounter + 1})
}), {
    name: 'cart'
}))
