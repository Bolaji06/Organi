import type { Metadata } from "next";

import { Cairo } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";


import { CartProvider } from "@/app/context/cartContext";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://organi-bice.vercel.app'),
  title: {
    default: 'Organi',
    template: '%s | Organi Store',
  },
  description: "E-commerce store",
  twitter: {
    card: 'summary_large_image'
  },
  authors: [{
    name: 'Bolaji Bolajoko',
    url: 'twitter.com@ari_kingz',
  }],
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
