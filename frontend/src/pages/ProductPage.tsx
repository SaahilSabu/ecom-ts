import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/productHook";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { StarRating } from "../components/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!)

  return isLoading ? (
    <LoadingBox />
  ) : error   ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ): (
    <div>
      <Helmet>
        <title>{slug}</title>
      </Helmet>
      <div
          key={product.id}
          className="relative m-auto flex w-72 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
        >
          <div className="mx-5 my-3 h-40 overflow-hidden rounded-xl">
            <img
              className="object-contain h-full w-full"
              src={product.image}
              alt="product image"
            />
          </div>
          <div className="px-5 pb-5 flex flex-col justify-between">
            <div className="h-16">
              <a href={`/product/${product.slug}`}>
                <h5 className="text-xl tracking-tight text-slate-900">
                  {product.title}
                </h5>
              </a>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-slate-900">
                  ${product.price}
                </span>
              </div>
              <StarRating
                rating={product.rating.rate}
                ratingCount={product.rating.count}
              />
            </div>
            <button className="mt-2 flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
              <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
              Add to cart
            </button>
          </div>
        </div>
    </div>
  );
};

export default ProductPage;
