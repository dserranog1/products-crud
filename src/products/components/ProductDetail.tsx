import { FC } from "react";
import { Product } from "../../types";

interface Props {
  product: Product;
}

const ProductDetail: FC<Props> = ({ product }) => {
  return (
    <div className="border-8 p-3 border-green-200 max-w-xl m-3">
      <h2 className="text-xl font-bold mb-5">{product.title}</h2>
      <img className="" src={product.images[0]} />
      <p>{product.category.name}</p>
      <p>{product.title}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductDetail;
