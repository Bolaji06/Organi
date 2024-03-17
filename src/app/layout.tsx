import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cairo } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

import { CartProvider } from "@/app/context/cartContext";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Organi',
    template: '%s | Organi Store'
  },
  description: "E-commerce store",
  twitter: {
    card: 'summary_large_image'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cairo.className}>
          <CartProvider>
            <div className="px-4 md:px-12">
            </div>
            {children}
          </CartProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
