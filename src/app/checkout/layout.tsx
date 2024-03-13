import Footer from "@/components/Footer";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        {children}
        <div>
          <Footer />
        </div>
      </main>
    </>
  );
}
