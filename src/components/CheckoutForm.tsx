"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CheckCircle, MapPinned } from "lucide-react";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Input } from "./ui/input";

import { z } from 'zod';

import { Country, State, City, ICity } from "country-state-city";

interface IForm {
  fullName: string,
  phoneNumber: string,
  address: string,
  lga: string,
  state: string,

}

export default function CheckoutForm({ user } : { user: string}) {
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [pickupDelivery, setPickupDelivery] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  const [deliveryForm, setDeliveryForm] = useState<IForm>({
    fullName: '',
    phoneNumber: '',
    address: '',
    lga: '',
    state: ''
  })

  function handleFormChange(e: ChangeEvent<HTMLInputElement>){
    setDeliveryForm((prevState) => {
      return (
        {...prevState, name: e.target.value}
      )

    })
  }

  const ref = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const [selectOption, setSelectOption] = useState("");

  function handleHomeDelivery() {
    setHomeDelivery((prevState) => (prevState = true));
    setPickupDelivery((prevState) => (prevState = false));
  }
  function handlePickupDelivery() {
    setPickupDelivery((prevState) => (prevState = true));
    setHomeDelivery((prevState) => (prevState = false));
    setOpenAddress((prevState) => (prevState = false));
  }
  function openAddressForm() {
    setOpenAddress((prevState) => !prevState);
  }
  function handleSelect(e: ChangeEvent<HTMLSelectElement>){
    setSelectOption(e.target.value);
  }

  const [sCity, setCity] = useState([]);
  const [cityOption, setCityOption] = useState('');
  
  const stateList = State.getStatesOfCountry("NG");
  const cityList = City.getCitiesOfState("NG", selectOption ?? selectOption);

  useEffect(() => {
    // @ts-ignore
    setCity(City.getCitiesOfState('NG', selectOption))
  }, [selectOption])
  console.log(sCity)

  function handleCitySelection(e: ChangeEvent<HTMLSelectElement>){
    setCityOption(e.target.value);
  }
  const schema = z.string();
  console.log(schema.parse('Bolaji'));



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
                ref={ref}
              />
              <label className="text-base text-center font-bold" htmlFor="home">
                Home Delivery
              </label>
            </div>

            <div className="md:py-6 md:px-9">
              <div className="bg-gray-50 px-9 py-10 rounded-md">
                <p className="text-sm">
                  Hi <span className="font-bold">{user}</span> Kindly add your
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

                {homeDelivery && openAddress ? (
                  <div>
                    <form action="" className="">
                      <div className="grid lg:grid-cols-2  gap-4 mt-6">
                        <div>
                          <label htmlFor="fullname" className="text-sm">
                            Full Name (First Name & Last Name)
                          </label>
                          <Input
                            id="fullname"
                            type="text"
                            name={deliveryForm.fullName}
                            value={deliveryForm.fullName}
                            className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                                    text-base"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="text-sm">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            name={deliveryForm.phoneNumber}
                            value={deliveryForm.phoneNumber}
                            className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                                    text-base"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="text-sm">
                            Address
                          </label>
                          <Input
                            id="address"
                            type="text"
                            name={deliveryForm.address}
                            value={deliveryForm.address}
                            className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                    text-base"
                          />
                        </div>
                        <div>
                          <label htmlFor="lga" className="text-sm">
                            Local Government Area (LGA)
                          </label>
                          <Input
                            id="lga"
                            type="text"
                            name={deliveryForm.lga}
                            value={deliveryForm.lga}
                            className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                    text-base"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="text-sm">
                            State
                          </label>
                          <Input
                            id="state"
                            type="text"
                            name={deliveryForm.state}
                            value={deliveryForm.state}
                            className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                    text-base"
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <Input
                          type="submit"
                          value={"Submit"}
                          className="w-32 px-5 py-2 flex justify-center cursor-pointer
                           lg:bg-transparent lg:border-2 lg:border-primary lg:text-primary
                           lg:hover:bg-primary transition-colors ease-linear duration-300
                           lg:hover:text-white lg:active:opacity-90
                           items-center rounded-md bg-primary text-white text-center font-semibold"
                        />
                        <Input
                          type="reset"
                          name="reset"
                          className="w-32 flex justify-center items-center font-semibold
                         text-white bg-red-600 hover:opacity-90 active:opacity-90 cursor-pointer"
                        />
                      </div>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
            <div></div>
          </section>
        </section>

        <section className="px-9 py-3 mb-4">
          <div className="flex items-center gap-3">
            <input
              className="appearance-none w-5 h-5 rounded-full
                 border border-gray-500 checked:border-8 cursor-pointer
                 transition-all duration-100 ease-linear
                  checked:border-red-700"
              type="radio"
              name="delivery"
              id="pickup"
              checked={pickupDelivery}
              value={"pickup"}
              onChange={handlePickupDelivery}
            />
            <label
              className="text-base font-bold text-center capitalize"
              htmlFor="pickup"
            >
              Pick up from store
            </label>
          </div>
          {pickupDelivery && <div className="grid md:grid-cols-2 gap-4 mt-6">
            <select value={selectOption} onChange={handleSelect} className="px-1 py-2 rounded-sm border border-gray-400">
              {
                stateList.map((state) => {
                  return (
                    <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                  )
                })
              }
            </select>

            <select value={cityOption} onChange={handleCitySelection} className="px-1 py-2 rounded-sm border border-gray-400">
              {
                cityList.map((city) => {
                  return (
                    <option key={city.name}>{city.name}</option>
                  )
                })
              }
            </select>
          </div>}
          {cityOption && <div className="p-4 w-40 border text-primary border-primary rounded-md cursor-pointer
           mt-4 hover:bg-primary hover:text-white transition-colors ease-linear duration-300">
            <h2 className="text-sm uppercase">
             2nd floor organi store {Math.floor(Math.random() * 100)}, GRA Estate off Express Road {cityOption}, {selectOption}.
            </h2>
          </div>}
        </section>
      </main>
    </>
  );
}
