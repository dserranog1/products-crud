import { FC } from "react";
import { Product } from "../../types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ProductUpdateForm from "./ProductUpdateForm";

interface Props {
  product: Product;
}

const ProductUpdateDialog: FC<Props> = ({ product }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-4 bg-blue-300 hover:bg-blue-100"
        >
          Update
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <ProductUpdateForm product={product} />
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductUpdateDialog;
