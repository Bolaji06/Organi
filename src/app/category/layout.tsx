import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <NavBar />
        {children}
        <Footer />
      </main>
    </>
  );
}
