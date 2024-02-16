import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { Product } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProduct } from "../api/products";
import ProductDetail from "./components/ProductDetail";

const ProductEditDelete = () => {
  const queryClient = useQueryClient();
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId!),
  });
  const deleteProductMutation = useMutation({
    mutationFn: () => deleteProduct(productId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/", { replace: true });
    },
  });
  if (isLoading) {
    return <Spinner />;
  }
  if (isError || !isSuccess) {
    return <div>woops! error loading the data</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-24">
      <ProductDetail product={product} />
      <button
        onClick={() => deleteProductMutation.mutate()}
        className="p-3 border-red-200 bg-red-400 hover:bg-red-500 rounded-md"
      >
        Delete item
      </button>
    </div>
  );
};

export default ProductEditDelete;
