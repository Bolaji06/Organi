import AllCategoryProduct from "@/components/AllCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'All Category',
}
export default function AllCategory() {
  return (
    <>
      <AllCategoryProduct />
    </>
  );
}
