"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Input } from "./ui/input";

export default function CheckoutForm() {
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [pickupDelivery, setPickupDelivery] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  function handleHomeDelivery() {
    setHomeDelivery((prevState) => !prevState);
  }
  function openAddressForm() {
    setOpenAddress((prevState) => !prevState);
  }

  return (
    <>
      <main className="border border-red-800 rounded-md">
        <section className="">
          <header className="flex gap-2 items-center py-2 px-3 border-b border-gray-300">
            <CheckCircle color="gray" size={19} />
            <h2 className="uppercase text-gray-800 font-bold">
              Delivery Options
            </h2>
          </header>

          <section className="">
            <div className="flex items-center px-9 gap-3 py-3">
              <input
                className="appearance-none w-5 h-5 rounded-full
                 border border-gray-500 checked:border-8 cursor-pointer
                 transition-all duration-100 ease-linear
                  checked:border-red-700"
                type="radio"
                name="delivery"
                id="home"
                checked={homeDelivery}
                value={"home"}
                onChange={handleHomeDelivery}
              />
              <label className="text-sm text-center" htmlFor="home">
                Home Delivery
              </label>
            </div>

            <div className="md:py-6 md:px-9">
              <div className="bg-gray-50 px-9 py-10 rounded-md">
                <p className="text-sm">
                  Hi <span className="font-bold">Bolaji</span> Kindly add your
                  address
                </p>
                <Button
                  onClick={openAddressForm}
                  aria-disabled={homeDelivery}
                  disabled={!homeDelivery}
                  className={` mt-4 active:opacity-85 hover:opacity-85  ${clsx({
                    "bg-slate-400 active:opacity-100 hover:opacity-100":
                      homeDelivery === false,
                  })}`}
                >
                  Add your address
                </Button>

                {openAddress && (
                  <div>
                    <form action="" className="grid lg:grid-cols-2  gap-4 mt-6">
                      <div>
                        <label htmlFor="fullname" className="text-sm">Full Name (First Name & Last Name)</label>
                        <Input
                          id="fullname"
                          type="text"
                          className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                                    text-base"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="text-sm">Phone Number</label>
                        <Input
                          id="phone"
                          type="tel"
                          className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                                    text-base"
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="text-sm">Address</label>
                        <Input
                          id="address"
                          type="text"
                          className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                    text-base"
                        />
                      </div>
                      <div>
                        <label htmlFor="lga" className="text-sm">Local Government Area (LGA)</label>
                        <Input
                          id="lga"
                          type="text"
                          className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                    text-base"
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="text-sm">State</label>
                        <Input
                          id="state"
                          type="text"
                          className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                    text-base"
                        />
                      </div>
                      {/* <Input type="submit" value={"Submit"} className="px-5 py-2 rounded-md bg-primary"/> */}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>

        <section></section>
      </main>
    </>
  );
}
