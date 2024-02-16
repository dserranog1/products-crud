import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { Product } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProduct } from "../api/products";
import ProductDetail from "./components/ProductDetail";
import { useToast } from "@/components/ui/use-toast";
import ProductUpdateDialog from "./ui/ProductUpdateDialog";
import { Button } from "@/components/ui/button";

const ProductEditDelete = () => {
  const queryClient = useQueryClient();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    data: product,
    isError,
    isLoading,
    isSuccess,
  } = useQuery<Product>({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId!),
  });
  const deleteProductMutation = useMutation({
    mutationFn: () => deleteProduct(productId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: `Product deletion successful`,
      });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast({
        title: "There has been and error while deleting the product",
        description: `If error persists contact support`,
        variant: "destructive",
      });
      console.log({ error });
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
      <div className="flex flex-row gap-4">
        <Button
          onClick={() => deleteProductMutation.mutate()}
          className="p-3 border-red-200 bg-red-400 hover:bg-red-500 rounded-md"
        >
          Delete item
        </Button>
        <ProductUpdateDialog product={product} />
      </div>
    </div>
  );
};

export default ProductEditDelete;
