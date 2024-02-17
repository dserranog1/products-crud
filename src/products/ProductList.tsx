import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { Product } from "../types";
import ProductDetail from "./components/ProductDetail";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

const filterProductsFn = (product: Product, query: string): boolean => {
  return (
    product.title
  )
    .toLowerCase()
    .includes(query.toLowerCase());
};


const ProductList = () => {
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState<string>("");
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
