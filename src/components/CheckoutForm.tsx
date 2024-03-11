"use client";

import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CheckCircle, Copy, MapPinned } from "lucide-react";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Input } from "./ui/input";

import { z, ZodError } from "zod";

import { Country, State, City, ICity } from "country-state-city";
import { IForm } from "@/lib/definitions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { copyAmountToClipboard, getCurrencySign } from "@/lib/utils";
import { CartContext } from "@/app/context/cartContext";
import { Skeleton } from "./ui/skeleton";
import { Span } from "next/dist/trace";

const deliveryFormSchema = z.object({
  fullName: z
    .string()
    .min(2)
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), {
      message: "Fullname must contain only letter",
    }),
  phoneNumber: z
    .string()
    .min(11)
    .max(11)
    .refine((val) => val !== null, { message: "Must contain number" }),
  address: z.string().min(3),
  lga: z.string().min(2),
  state: z.string().min(2),
});

const cardSchema = z.object({
  cardHolderName: z
    .string()
    .min(2)
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), {
      message: "Card holder name must contain letters",
    }),
  cardNumber: z.string().length(16).min(0),
  expiryMonth: z
    .string()
    .min(new Date().getMonth())
    .max(11)
    .min(0)
    .refine(
      (val) => {
        const month = parseInt(val);
        return !isNaN(month) && month >= 1 && month <= 12;
      },
      {
        message: "Must be number of a month",
      }
    ),
  expiryYear: z
    .string()
    .length(4)
    .min(0)
    .refine((val) => val !== undefined && val !== null, {
      message: "Card year is reqired",
    }),
  cvv: z
    .string()
    .length(4)
    .refine((val) => /^\d.+$/.test(val), {
      message: "Card CVV must contain only number",
    }),
});

type CardFormType = {
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
};

type FormErrorsType = Partial<Record<keyof CardFormType, string>>;
type DeliveryFormError = Partial<Record<keyof IForm, string>>;

export default function CheckoutForm({ user }: { user: string }) {
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [pickupDelivery, setPickupDelivery] = useState(false);
  const [paymentOnDelivery, setPaymentOnDelivery] = useState(false);
  const [paymentWithCard, setPaymentWithCard] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [hasMount, setHasMount] = useState(false);

  const { getTotalPriceWithQuantity } = useContext(CartContext);
  const amountToPay = getTotalPriceWithQuantity() * 100;

  function handlePaymentOnDelivery() {
    setPaymentOnDelivery(true);
    setPaymentWithCard(false);
  }
  function handlePaymentWithCard() {
    setPaymentOnDelivery(false);
    setPaymentWithCard(true);
  }

  useEffect(() => {
    setHasMount(true);
  }, []);

  const [deliveryForm, setDeliveryForm] = useState<IForm>({
    fullName: "",
    phoneNumber: "",
    address: "",
    lga: "",
    state: "",
  });
  const [deliveryFormError, setDeliveryFormError] = useState<DeliveryFormError>(
    {}
  );
  const [cardForm, setCardFrom] = useState<CardFormType>({
    cardHolderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [cardPaymentFormError, setCardPaymentFormError] = useState<FormErrorsType>({});

  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDeliveryForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleCardPaymentForm(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCardFrom((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function onDeliveryFormSubmition(e: FormEvent) {
    e.preventDefault();
    try {
      deliveryFormSchema.parse(deliveryForm);
      console.log("Delivery form is valid ", deliveryForm);
      setDeliveryFormError({});
      // Don't really understand how this part works tho :)
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Delivery form failed", error.errors);
        const formattedErrors: DeliveryFormError = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            formattedErrors[err.path[0] as keyof IForm] = err.message;
          }
        });
        setDeliveryFormError(formattedErrors);
      }
    }
  }
  function onFormPaymentSubmition(e: FormEvent) {
    e.preventDefault();
    try {
      cardSchema.parse(cardForm);
      console.log("Card Input is valid ", cardForm);
      setCardPaymentFormError({});
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Validation failed:", error.errors);
        const formattedErrors: FormErrorsType = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            formattedErrors[err.path[0] as keyof CardFormType] = err.message;
          }
        });
        setCardPaymentFormError(formattedErrors);
      }
    }
  }

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
  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    setSelectOption(e.target.value);
  }

  const [sCity, setCity] = useState([]);
  const [cityOption, setCityOption] = useState("");

  const stateList = State.getStatesOfCountry("NG");
  const cityList = City.getCitiesOfState("NG", selectOption ?? selectOption);

  useEffect(() => {
    // @ts-ignore
    setCity(City.getCitiesOfState("NG", selectOption));
  }, [selectOption]);

  function handleCitySelection(e: ChangeEvent<HTMLSelectElement>) {
    setCityOption(e.target.value);
  }

  const bgStyle = {
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: `400% 400%`,
    animation: `gradient 15s ease infinite`,
  };
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
                    <form onSubmit={onDeliveryFormSubmition}>
                      <div className="grid lg:grid-cols-2  gap-4 mt-6">
                        <div>
                          <label htmlFor="fullname" className="text-sm">
                            Full Name (First Name & Last Name)
                          </label>
                          <div>
                            <Input
                              id="fullname"
                              type="text"
                              name="fullName"
                              value={deliveryForm.fullName}
                              onChange={handleFormChange}
                              className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                                    text-base"
                            />
                            {deliveryFormError && (
                              <span className="text-red-500 text-sm">
                                {deliveryFormError.fullName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="phone" className="text-sm">
                            Phone Number
                          </label>
                          <div>
                            <Input
                              id="phone"
                              type="number"
                              name="phoneNumber"
                              value={deliveryForm.phoneNumber}
                              onChange={handleFormChange}
                              className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                                    text-base"
                            />
                            {deliveryFormError && (
                              <span className="text-red-500 text-sm">
                                {deliveryFormError.phoneNumber}
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="city" className="text-sm">
                            Address
                          </label>
                          <div>
                            <Input
                              id="address"
                              type="text"
                              name="address"
                              value={deliveryForm.address}
                              onChange={handleFormChange}
                              className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                    text-base"
                            />
                            {deliveryFormError && (
                              <span className="text-red-500 text-sm">
                                {deliveryFormError.address}
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="lga" className="text-sm">
                            Local Government Area (LGA)
                          </label>
                          <div>
                            <Input
                              id="lga"
                              type="text"
                              name="lga"
                              value={deliveryForm.lga}
                              onChange={handleFormChange}
                              className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                    text-base"
                            />
                            {deliveryFormError && (
                              <span className="text-red-500 text-sm">
                                {deliveryFormError.lga}
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="city" className="text-sm">
                            State
                          </label>
                          <div>
                            <Input
                              id="state"
                              type="text"
                              name="state"
                              value={deliveryForm.state}
                              onChange={handleFormChange}
                              className="border-2 focus-visible:border-none border-slate-200 focus-visible:ring-primary
                    text-base"
                            />
                            {deliveryFormError && (
                              <span className="text-red-500 text-sm">
                                {deliveryFormError.state}
                              </span>
                            )}
                          </div>
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
          {pickupDelivery && (
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <select
                value={selectOption}
                onChange={handleSelect}
                className="px-1 py-2 rounded-sm border border-gray-400"
              >
                <option value="" disabled selected>
                  Select state
                </option>
                {stateList.map((state) => {
                  return (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  );
                })}
              </select>

              <select
                value={cityOption}
                onChange={handleCitySelection}
                className="px-1 py-2 rounded-sm border border-gray-400"
              >
                <option value="" disabled selected>
                  Select city
                </option>
                {cityList.map((city) => {
                  return <option key={city.name}>{city.name}</option>;
                })}
              </select>
            </div>
          )}
          {cityOption && (
            <div
              className="p-4 w-40 border text-primary border-primary rounded-md cursor-pointer
           mt-4 hover:bg-primary hover:text-white transition-colors ease-linear duration-300"
            >
              <h2 className="text-sm uppercase">
                2nd floor organi store {Math.floor(Math.random() * 100)}, GRA
                Estate off Express Road {cityOption}, {selectOption}.
              </h2>
            </div>
          )}
        </section>

        <section>
          <header className="flex gap-2 items-center mt-6 py-2 px-3 border-t border-b border-gray-300">
            <CheckCircle color="gray" size={19} />
            <h2 className="uppercase text-gray-800 font-bold">
              Payment Options
            </h2>
          </header>
          <section className="pb-8">
            <div className="flex items-center gap-3 ml-8 mt-6">
              <input
                className="appearance-none w-5 h-5 rounded-full
                 border border-gray-500 checked:border-8 cursor-pointer
                 transition-all duration-100 ease-linear
                  checked:border-orange-500"
                type="radio"
                name="payment"
                id="onsite"
                checked={paymentOnDelivery}
                value={"onsite"}
                onChange={handlePaymentOnDelivery}
              />
              <label
                className="text-base font-bold text-center capitalize"
                htmlFor="onsite"
              >
                Payment on Delivery
              </label>
            </div>

            {paymentOnDelivery && (
              <div className="mx-8 rounded-md bg-white my-4 p-6">
                <p className="text-sm text-gray-500">
                  Choose Payment on Delivery and pay when you receive your
                  items. Please note: A valid ID is required upon delivery.
                  Orders above $500 do not qualify for this option. Experience
                  convenience and security with every purchase!
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 ml-8 mt-6">
              <input
                className="appearance-none w-5 h-5 rounded-full
                 border border-gray-500 checked:border-8 cursor-pointer
                 transition-all duration-100 ease-linear
                  checked:border-orange-500"
                type="radio"
                name="payment"
                id="card"
                checked={paymentWithCard}
                value={"onsite"}
                onChange={handlePaymentWithCard}
              />
              <label
                className="text-base font-bold text-center capitalize"
                htmlFor="card"
              >
                Pay with Card
              </label>
            </div>
            {!paymentOnDelivery && (
              <div className="grid md:grid-cols-[1fr,2fr] sm:mr-8 rounded-md sm:ml-8 mt-4">
                <div className="relative h-32 w-full md:h-full">
                  <div
                    style={bgStyle}
                    className="animate-payment-card
                  absolute inset-0"
                  />
                  <div
                    className="
                  absolute inset-0 z-10 bg-black bg-opacity-35"
                  />
                  <div
                    className="absolute z-20 md:top-1/3 mt-4 md:mt-0
                -translate-x-1/2 left-1/2"
                  >
                    <p className="text-slate-200 text-sm text-center">
                      You are to pay
                    </p>
                    {hasMount ? (
                      <div className="flex gap-2">
                        <h1 className="text-3xl text-white font-semibold text-center md:py-2">
                          {getCurrencySign(amountToPay)}
                        </h1>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={() =>
                                  copyAmountToClipboard(amountToPay.toString())
                                }
                                className="bg-transparent self-end p-0"
                              >
                                <Copy size={18} color="white" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy amount</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : (
                      <Skeleton className="my-4 w-40 h-5 bg-slate-50" />
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-tr-md rounded-br-md px-4 py-3">
                  <header className="mb-4">
                    <h2 className="font-extralight text-3xl text-black">
                      Payment
                    </h2>
                    <p>Pay with your card</p>
                  </header>

                  <form onSubmit={onFormPaymentSubmition}>
                    <div className="flex flex-col gap-3">
                      <label
                        htmlFor="card-name text-sm"
                        className="text-sm capitalize"
                      >
                        Card Holder Name
                      </label>
                      <div>
                        <Input
                          type="text"
                          id="card-name"
                          placeholder="Ceil Ed"
                          name="cardHolderName"
                          value={cardForm.cardHolderName}
                          onChange={handleCardPaymentForm}
                        />
                        {cardPaymentFormError.cardHolderName && (
                          <span className="text-red-500 text-sm">
                            {cardPaymentFormError.cardHolderName}
                          </span>
                        )}
                      </div>
                      <label htmlFor="card-num" className="text-sm capitalize">
                        Card Number
                      </label>
                      <div>
                        <Input
                          type="number"
                          id="card-num"
                          placeholder="XXXX  XXXX  XXXX  XXXX"
                          name="cardNumber"
                          value={cardForm.cardNumber}
                          onChange={handleCardPaymentForm}
                          className="appearance-none m-0"
                        />
                        <span>
                          {cardPaymentFormError.cardNumber && (
                            <span className="text-red-500 text-sm">
                              {cardPaymentFormError.cardNumber}
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3 mt-2">
                        <label className="text-sm">
                          Expiry Month
                          <div>
                            <Input
                              placeholder={new Date().getMonth().toString()}
                              type="number"
                              className="mt-2"
                              name="expiryMonth"
                              value={cardForm.expiryMonth}
                              onChange={handleCardPaymentForm}
                            />
                            {cardPaymentFormError.expiryMonth && (
                              <span className="text-red-500 text-sm">
                                {cardPaymentFormError.expiryMonth}
                              </span>
                            )}
                          </div>
                        </label>
                        <label className="text-sm">
                          Year
                          <div>
                            <Input
                              placeholder={new Date().getFullYear().toString()}
                              type="number"
                              className="mt-2"
                              name="expiryYear"
                              value={cardForm.expiryYear}
                              onChange={handleCardPaymentForm}
                            />
                            {cardPaymentFormError.expiryYear && (
                              <span className="text-red-500 text-sm">
                                {cardPaymentFormError.expiryYear}
                              </span>
                            )}
                          </div>
                        </label>
                        <label className="text-sm">
                          CVV
                          <div>
                            <Input
                              type="number"
                              placeholder="4 digits CVV"
                              className="mt-2"
                              name="cvv"
                              value={cardForm.cvv}
                              onChange={handleCardPaymentForm}
                            />
                            {cardPaymentFormError.cvv && (
                              <span className="text-red-500 text-sm">
                                {cardPaymentFormError.cvv}
                              </span>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                    <Button type="submit" className="mt-6">
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  );
}
