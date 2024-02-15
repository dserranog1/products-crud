import { FC } from "react";
import { Product } from "../../types";

interface Props {
  product: Product;
}

const SingleProduct: FC<Props> = ({ product }) => {
  return (
    <div className="border-8 m-3 p-3 border-green-200">
      <h2 className="text-xl font-bold mb-5 text-justify">{product.title}</h2>
      <img src={product.images[0]} />
      <p>{product.category.name}</p>
      <p>{product.title}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default SingleProduct;
