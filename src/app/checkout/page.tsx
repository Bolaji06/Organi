import Image from "next/image";

import logo from "../../../public/logo.png.webp";
import CheckoutForm from "@/components/CheckoutForm";
import CheckOutSummary from "@/components/CheckoutSummary";

export default function CheckoutPage() {
  return (
    <>
      <main className="bg-slate-100 pb-6">
        <header className="shadow-md px-4 lg:px-12 py-4 bg-white">
          <Image
            src={logo}
            alt="Organi logo"
            width={200}
            height={200}
            className="w-20"
          />
        </header>
        <main className="mt-0">
          <section className="px-6 ">
            <section className="grid gap-5 lg:grid-cols-[3fr,1fr] mt-6 mb-10">
              <CheckoutForm />
              <CheckOutSummary />
            </section>
          </section>
        </main>
      </main>
    </>
  );
}
