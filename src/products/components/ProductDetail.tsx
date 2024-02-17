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
      <div className="mt-6">
        <span>
          Category: <p className="font-bold">{product.category.name}</p>
        </span>
      </div>
      <p className="italic mt-2">{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductDetail;
