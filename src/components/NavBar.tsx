"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png.webp";

import { links } from "@/lib/links";
import { MenuSquare, MessagesSquareIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { clsx } from "clsx";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { LikeProduct, UserAvatar } from "./ui/cart-nav";
import CartDropdown from "./ui/cart-dropdown";
import LikeDropdowmn from "./ui/like-dropdown";
import { Suspense } from "react";
import { SvgSpinnersEclipse } from "./client";

export default function NavBar() {
  const pathname = usePathname();

  const [hasMount, setHasMount] = useState(false);

  useEffect(() => {
    setHasMount(true);
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center  py-4">
        <div>
          <Link href={"/"}>
            <Image src={logo} alt="Organi logo" width={100} height={100} />
          </Link>
        </div>

        <div
          className={`hidden lg:flex items-center gap-12 text-black lg:uppercase font-extrabold
                 text-sm tracking-[.2em]`}
        >
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`${clsx("text-black", {
                  "text-primary": pathname === link.href,
                })}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex gap-6 items-center">
          <UserAvatar />
          {hasMount ? (
            <div className="flex items-center gap-6">
              <LikeDropdowmn />
              <CartDropdown />
            </div>
          ) : (
            <SvgSpinnersEclipse />
          )}

          <Drawer>
            <DrawerTrigger asChild>
              <Button className="lg:hidden bg-transparent">
                <MenuSquare color="black" size={30} />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  <div className="flex justify-between items-center">
                    <Image
                      src={logo}
                      alt="Organi Logo"
                      width={100}
                      height={100}
                    />
                    <UserAvatar />
                  </div>
                  <div className="flex gap-4 items-center pt-4">
                    <LikeProduct />
                    {/* <CartDropdown /> */}
                  </div>
                </DrawerTitle>
              </DrawerHeader>

              <div className="flex flex-col gap-6 px-5 py-6">
                {links.map((link) => {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-black uppercase font-extrabold
                                                text-sm ${clsx({
                                                  "text-primary":
                                                    pathname === link.href,
                                                })}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <DrawerFooter>
                <div className="flex gap-2 items-center">
                  <MessagesSquareIcon size={28} />
                  <p>@organistore.com</p>
                </div>
                <p className="text-sm">Free Shipping is Available</p>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </>
  );
}
