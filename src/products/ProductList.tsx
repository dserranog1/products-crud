import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { Product } from "../types";
import ProductDetail from "./components/ProductDetail";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const filterProductsFn = (product: Product, query: string): boolean => {
  return (
    product.title
  )
    .toLowerCase()
    .includes(query.toLowerCase());
};

const compareProductAsc = (productA: Product, productB: Product) => {
  if (productA.price > productB.price) {
    return 1
  }
  if (productA.price < productB.price) {
    return -1
  }
  return 0
}
const compareProductDesc = (productA: Product, productB: Product) => {
  if (productA.price > productB.price) {
    return -1
  }
  if (productA.price < productB.price) {
    return 1
  }
  return 0
}


const ProductList = () => {
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const [orderByValue, setOrderByValue] = useState<string>("asc");
  const {
    data: products,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (isError || !isSuccess) {
    return <div>woops! error loading the data</div>;
  }


    const currentListOfProducts = isFiltered
      ? filteredProducts
      : products

    currentListOfProducts.sort(orderByValue === 'asc' ? compareProductAsc : compareProductDesc)

  return (
    <div className="flex flex-col gap-4">
      <Link to="/products/new">
        <Button className="bg-green-600 hover:bg-green-500">New product</Button>
      </Link>
      <SearchBar<Product>
        searchBarValue={searchBarValue}
        setSearchBarValue={setSearchBarValue}
        setFilteredData={setFilteredProducts}
        setIsFiltered={setIsFiltered}
        data={products}
        filterFn={filterProductsFn}
      />
      <Select onValueChange={(value) => setOrderByValue(value)} defaultValue={orderByValue}>
        <SelectTrigger>
          <SelectValue placeholder="Select one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">
            Order by price ascending
          </SelectItem>
          <SelectItem value="desc">
            Order by price descending
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-4">
        {currentListOfProducts.map((product) => {
          return (
            <Link key={product.id} to={`products/${product.id}`}>
              <ProductDetail product={product} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
