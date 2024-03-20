import { getTopDealsProducts } from "@/app/api/routes";
import Carpet from "./Carpet";
import { ProductCard } from "./ProductCard";
import { title } from "process";
import Link from "next/link";
import InfiniteScrollLoader from "./InfiniteScroll";
import Image from "next/image";

export default async function AllProduct() {
  const smartphonesDeals = await getTopDealsProducts("smartphones");
  const topsDeals = await getTopDealsProducts("tops");
  const laptopsDeals = await getTopDealsProducts("laptops");
  const woemenDressDeals = await getTopDealsProducts("womens-dresses");
  const womenJewlleryDeals = await getTopDealsProducts("womens-jewellery");
  const womenBagsDeals = await getTopDealsProducts("womens-bags");
  const menDressDeals = await getTopDealsProducts("mens-shirts");
  const menShoesDeals = await getTopDealsProducts("mens-shoes");
  const menWatchDeals = await getTopDealsProducts("mens-watches");

  const [
    smartphones,
    tops,
    laptops,
    womenDress,
    womenJewllery,
    womenBags,
    menDress,
    menShoes,
    menWatch,
  ] = await Promise.all([
    smartphonesDeals,
    topsDeals,
    laptopsDeals,
    woemenDressDeals,
    womenJewlleryDeals,
    womenBagsDeals,
    menDressDeals,
    menShoesDeals,
    menWatchDeals,
  ]);

  const styles = {
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  };

  return (
    <>
      <main className="mb-10" id="shop">
        <Carpet title="Smartphones Top Deals" bgColor="1, 62, 255">
          <div className="grid gap-3" style={styles}>
            {smartphones?.products?.map((item: any) => {
              return (
                <Link
                  key={item.id}
                  href={`/product-details/${item.id}`}
                  className=""
                >
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                    className=""
                  />
                </Link>
              );
            })}
          </div>
        </Carpet>

        <Carpet title="Winter-Tops Deals" bgColor="255, 0, 0">
          <div className="grid gap-3" style={styles}>
            {tops?.products?.map((item: any) => {
              return (
                <Link key={item.id} href={`/product-details/${item.id}`}>
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                  />
                </Link>
              );
            })}
          </div>
        </Carpet>

        <Carpet title="Best Laptop Deals" bgColor="128, 0, 255">
          <div className="grid gap-3" style={styles}>
            {laptops?.products?.map((item: any) => {
              return (
                <Link key={item.id} href={`/product-details/${item.id}`}>
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                  />
                </Link>
              );
            })}
          </div>
        </Carpet>

        <Carpet title="Women Fashion Deals" bgColor="255, 0, 168">
          <div className="grid gap-3" style={styles}>
            {womenDress?.products?.map((item: any) => {
              return (
                <Link key={item.id} href={`/product-details/${item.id}`}>
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                  />
                </Link>
              );
            })}
            {womenJewllery?.products?.map((item: any) => {
              return (
                <Link key={item.id} href={`/product-details/${item.id}`}>
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                  />
                </Link>
              );
            })}
            {womenBags?.products?.map((item: any) => {
              return (
                <Link key={item.id} href={`/product-details/${item.id}`}>
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                  />
                </Link>
              );
            })}
          </div>
        </Carpet>

        <Carpet title="Men Mega Deals" bgColor="91, 48, 2">
          <div className="grid gap-3" style={styles}>
            {menDress?.products?.map((item: any) => {
              return (
                <Link key={item.id} href={`/product-details/${item.id}`}>
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                  />
                </Link>
              );
            })}
            {menShoes?.products?.map((item: any) => {
              return (
                <Link key={item.id} href={`/product-details/${item.id}`}>
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                  />
                </Link>
              );
            })}
            {menWatch?.products?.map((item: any) => {
              return (
                <Link key={item.id} href={`/product-details/${item.id}`}>
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    image={item.images[0]}
                    rate={item.rating}
                    discount={item.discountPercentage}
                  />
                </Link>
              );
            })}
          </div>
        </Carpet>
        {/* <InfiniteScrollLoader /> */}
      </main>
    </>
  );
}
