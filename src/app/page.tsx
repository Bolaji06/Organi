import AllProduct from "@/components/AllProducts";
import { HeroCarousel } from "@/components/Carousel";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { CategoryTab, SearchInput } from "@/components/TopLevel";
import { auth, currentUser } from "@clerk/nextjs";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <NavBar />
      <main className="px-4 lg:px-14">
        <section>
          <div className="flex gap-3 h-[431px]  justify-end my-6">
            <div className="hidden lg:block basis-[20%] shadow-md rounded-md px-3 py-1">
              <CategoryTab />
            </div>
            <HeroCarousel autoScroll={true} />
          </div>
          <Category />
          <AllProduct />
        </section>
      </main>
      <Footer />
    </>
  );
}
