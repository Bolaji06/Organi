import heroImg1 from "../../public/assets/gameconsole.webp";
import heroImg2 from "../../public/assets/kshop.webp";
import heroImg3 from "../../public/assets/val.webp";
import heroImg4 from "../../public/assets/swthrt.webp";
import heroImg5 from "../../public/assets/liveauction.webp";
import heroImg6 from "../../public/assets/home-gadget.webp";
import heroImg7 from "../../public/assets/women.webp";

// Womens Wear carousel images
import woman1 from "../../public/assets/women-banner1.webp";
import woman2 from "../../public/assets/women-banner2.webp";
import woman3 from "../../public/assets/women-banner3.webp";

// Jewelery carousel images
import jewelery1 from "../../public/assets/jewlery banner.jpg";
import jewelery2 from "../../public/assets/jewlery-banner2.jpg";

// Electronics ads carousel images
import electronic1 from "../../public/assets/electronic-banner.webp";
import electronic2 from "../../public/assets/phone-banner.jpg";
import electronic3 from "../../public/assets/samsung-banner.jpg";
import electronic4 from "../../public/assets/mac-book.jpg";

// Men clothing ads carousel images
import men1 from "../../public/assets/men-clothing banner.jpg";
import men2 from "../../public/assets/men-banner.jpg";
import men3 from "../../public/assets/men-banner1.jpg";

export const carouselHero = [
  {
    url: heroImg1,
    text: "Here is the Text1",
  },
  {
    url: heroImg2,
    text: "Here is the Text2",
  },
  {
    url: heroImg3,
    text: "Here is the Text3",
  },
  {
    url: heroImg4,
    text: "Here is the Text3",
  },
  {
    url: heroImg5,
    text: "Here is the Text3",
  },
  {
    url: heroImg6,
    text: "Here is the Text3",
  },
  {
    url: heroImg7,
    text: "Here is the Text3",
  },
];

export const menAdsCarousel: any[] = [men1, men2, men3];
export const womenAdsCarousel = [woman1, woman2, woman3];
export const jewleryAdsCarousel: any[] = [jewelery1, jewelery2];
export const electronicAdsCarousel: any[] = [
  electronic1,
  electronic2,
  electronic3,
  electronic4,
  ...womenAdsCarousel,
  ...jewleryAdsCarousel,
  ...menAdsCarousel,
];
