import AllProduct from "@/components/AllProducts";
import { HeroCarousel } from "@/components/Carousel";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import TopLevel from "@/components/TopLevel";
import { auth, currentUser } from "@clerk/nextjs";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <NavBar />
      <main className="px-4 lg:px-14">
        <section>
          <TopLevel isContact={true} />
          <div className="flex h-[431px] lg:ml-[1%] justify-end lg:mr-14 my-6">
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
