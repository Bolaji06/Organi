import AllCategoryProduct from "@/components/AllCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Products Category',
}
export default function AllCategory() {
  return (
    <>
      <AllCategoryProduct />
    </>
  );
}
