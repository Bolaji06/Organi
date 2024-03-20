import Image from "next/image";

import logo from "../../public/organi_logo.png";
import { Link, PhoneCall, Twitter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <>
      <footer className="">
        <div className="bg-yellow-50 px-4 lg:px-12 py-6">
          <h2 className="text-gray-600 text-base lg:text-lg font-bold">
            Organi Online Shopping in Nigeria - Best Shopping Site
          </h2>
          <p className="text-slate-400">
            Organi.com is Nigeria’s number one online Shopping destination. We
            pride ourselves in having everything you could possibly need for
            life and living at the best prices than anywhere else. Our access to
            Original Equipment Manufacturers and premium sellers gives us a wide
            range of products at very low prices. Some of our popular categories
            include electronics, mobile phones, computers, fashion, beauty
            products, home and kitchen, Building and construction materials and
            a whole lot more from premium brands. Some of our other categories
            include Food and drinks, automotive and industrial, books, musical
            equipment, babies and kids items, sports and fitness, to mention a
            few. To make your shopping experience swift and memorable, there are
            also added services like gift vouchers, consumer promotion
            activities across different categories and bulk purchases with
            hassle-free delivery. Enjoy free shipping rates for certain products
            and with the bulk purchase option, you can enjoy low shipping rates,
            discounted prices and flexible payment. When you shop on our
            platform, you can pay with your debit card, which is a convenient
            and secured payment solution. Get the best of lifestyle services
            online. Don&apos;t miss out on the biggest sales online which takes
            place on special dates yearly.
          </p>
        </div>

        <div className="bg-gray-100 px-4 lg:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <Image
                src={logo}
                alt="Orgain footer logo"
                width={70}
                height={70}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-slate-500">
                <PhoneCall color="white" size={22} />
              </div>
              <h2 className="font-bold">+234 479 8291</h2>
            </div>

            <div className="w-[300px] md:w-full mt-4 md:mt-0">
              <p>Subscribe to our newsletter</p>
              <div className="flex items-center w-full">
                <Input
                  className="w-[700px] lg:w-full min-w-0 rounded-none focus:border focus:border-primary py-1 focus:outline-none
                              focus:focus-visible:ring-0"
                  placeholder="Enter your email"
                />
                <Button className="rounded-none font-semibold">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
