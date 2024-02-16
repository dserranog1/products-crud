import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { Product } from "../types";
import ProductDetail from "./components/ProductDetail";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";

const ProductList = () => {
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

  return (
    <div className="grid grid-cols-4">
      {products.map((product) => {
        return (
          <Link key={product.id} to={`products/${product.id}`}>
            <ProductDetail product={product} />
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
