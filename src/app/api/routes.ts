import { error } from "console";

const URL = "https://dummyjson.com/products";

export async function getAllCategories() {
  try {
    const allCategory = await fetch(`${URL}/categories`);
    return allCategory.json();
  } catch (e) {
    console.log(e);
  }
}

export async function getCategoryProduct(category: string) {
  try {
    const productsCategory = await fetch(`${URL}/category/${category}`);
    return productsCategory.json();
  } catch (e) {
    console.log(e);
  }
}
export async function getSingleProductDetail(id: number) {
  try {
    const productDetails = await fetch(`${URL}/${id}/?limit=194&skip=0`);
    return productDetails.json();
  } catch (e) {
    console.log(e);
  }
}
export async function searchProduct(item: string) {
  try {
    const searchItem = await fetch(`${URL}/search?q=${item}`);
    return searchItem.json();
  } catch (error) {
    console.log(error);
  }
}
export async function getTopDealsProducts(product: string) {
  try {
    const productDeals = await fetch(`${URL}/category/${product}`);
    return productDeals.json();
  } catch (error) {
    console.log(error);
  }
}
