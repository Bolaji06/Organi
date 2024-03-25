import { Armchair, Brush, Diamond, Gem, Glasses, Grape, Laptop, Luggage, PaintRoller, Shirt, Smartphone, SprayCan } from "lucide-react";

interface IDropdownItem {
  href: string,
  name: string,
  icon: any
}
type TDropdownCategory = IDropdownItem[]

export const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Category",
    href: "/category",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export const dropDownCategory: TDropdownCategory = [
  {
    href: 'smartphones',
    name: 'Smarphone',
    icon: Smartphone
  },
  {
    href: 'groceries',
    name: 'Groceries',
    icon: Grape,
  },
  {
    href: 'laptops',
    name: 'Laptop',
    icon: Laptop,
  },
  {
    href: 'skincare',
    name: 'Skin Care',
    icon: Brush,
  },
  {
    href: 'tops',
    name: 'Tops',
    icon: Shirt,
  },
  {
    href: 'fragrances',
    name: 'Fragrances',
    icon: SprayCan,
  },
  {
    href: 'sunglasses',
    name: 'Sunglasses',
    icon: Glasses,
  },
  {
    href: 'furniture',
    name: 'Furniture',
    icon: Armchair,
  },
  {
    href: 'womens-bags',
    name: 'Women Bags',
    icon: Luggage,
  },
  {
    href: 'mens-shirts',
    name: 'Men Shirt',
    icon: Shirt,
  },
  {
    href: "womens-jewellery",
    name: 'Jewellery',
    icon: Gem,
  },
  {
    href: 'home-decoration',
    name: 'Home Decoration',
    icon: PaintRoller,
  },

]
export const cardSkeleton = ["card1", "card2", "card3", "card4", "card4",
 "card4", "card4", "card4", "card4", "card4", "card4", "card4", "card4"];