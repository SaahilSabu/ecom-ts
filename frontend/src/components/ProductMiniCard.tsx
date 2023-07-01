import { Product } from "../types/Product.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { StarRating } from "./Rating";
type ProductMiniCardProps = {
  product: Product;
};

const ProductMiniCard = (props: { product: Product }) => {
  const { product } = props;
  return (
    <div className="relative m-auto flex w-72 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div className="mx-5 my-3 h-40 overflow-hidden rounded-xl">
        <img
          className="object-contain h-full w-full"
          src={product?.image}
          alt="product image"
        />
      </div>
      <div className="px-5 pb-5 flex flex-col justify-between">
        <div className="h-16">
          <a href={`/product/${product.slug}`}>
            <h5 className="text-xl tracking-tight text-slate-900">
              {product.name}
            </h5>
          </a>
        </div>
        <div className=" flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-slate-900">
              ${product.price}
            </span>
          </div>
          <StarRating
            rating={product.rating.rate}
            ratingCount={product.rating.count}
            starWidth={20}
            ratingCountStyle = {"text-xs"}
          />
        </div>
        <button className="mt-2 flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
          <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductMiniCard;
