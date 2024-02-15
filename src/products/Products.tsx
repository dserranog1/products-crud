import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { Product } from "../types";
import SingleProduct from "./components/SingleProduct";
import Spinner from "../ui/Spinner";

const Products = () => {
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
        return <SingleProduct key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Products;
