import { Suspense } from "react";
import Loading from "./[id]/loading";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ProductDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <NavBar />
        {children}
        <Footer />
      </main>
    </>
  );
}
