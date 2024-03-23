"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/organi_logo.png";

import { dropDownCategory, links } from "@/lib/links";
import { CircleUserRound, MenuSquare, MessagesSquareIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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
import { LikeProduct } from "./ui/cart-nav";
import CartDropdown from "./ui/cart-dropdown";
import LikeDropdowmn from "./ui/like-dropdown";
import { Suspense } from "react";
import { SvgSpinnersEclipse } from "./client";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { SearchInput } from "./TopLevel";

export default function NavBar(): React.ReactElement | null {
  const pathname = usePathname();
  const router = useRouter();

  const [hasMount, setHasMount] = useState(false);

  useEffect(() => {
    setHasMount(true);
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center px-6 lg:px-12 py-3 lg:flex-nowrap flex-wrap">
        <div>
          <Link href={"/"}>
            <Image src={logo} alt="Organi logo" width={50} height={50} />
          </Link>
        </div>

        <div className="order-1 w-full mt-3 lg:mt-0"> 
          <SearchInput />
        </div>

        <div className="flex gap-6 items-center lg:order-1">
          <div>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <CircleUserRound
                className="cursor-pointer"
                size={24}
                onClick={() => router.push("/sign-in")}
              />
            </SignedOut>
          </div>
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
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex gap-4 items-center pt-4">
                    
                  </div>
                </DrawerTitle>
              </DrawerHeader>

              <div className="h-[60%] overflow-y-auto px-4">
              {dropDownCategory.map((category) => {
              return (
                <div
                  key={category.name}
                  className=" hover:bg-white cursor-pointer group py-2"
                >
                  <Link
                    href={`/category/${category.href}`}
                    className="w-full py-1 flex gap-3 items-center"
                  >
                    <category.icon
                      size={20}
                      className="text-black/80 group-hover:text-primary"
                    />
                    <p className="text-black/80 group-hover:text-primary group-hover:font-semibold">
                      {category.name}
                    </p>
                  </Link>
                </div>
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
