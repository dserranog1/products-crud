import { FC } from "react";
import { Product } from "../../types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  product: Product;
}

const ProductDetail: FC<Props> = ({ product }) => {
  return (
    <div className="m-2 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
          <CardDescription>{product.category.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <img className="mb-8" src={product.images[0]} />
          <span className="italic">{product.description}</span>
        </CardContent>
        <CardFooter>
          <p className="bold text-xl">{product.price}$</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductDetail;
