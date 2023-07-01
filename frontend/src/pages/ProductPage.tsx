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
import ProductColorPicker from "../components/ProductColorPicker";
import ProductSizePicker from "../components/ProductSizePicker";
import { Button } from "react-bootstrap";

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;

  const tempImages = [
    "https://www.daviddassow.com/wp-content/uploads/2021/11/mens-the-kooples-coats-parkas-khaki-bomber-jacket-with-orange-lining_4.jpg",
    "https://assets.myntassets.com/fl_progressive/h_960,q_80,w_720/v1/assets/images/5453186/2018/10/30/ef1d9ca6-156b-4cf6-a52d-1e7f58b51b8b1540888118150-Roadster-Men-Jackets-9141540888117961-1.jpg",
    "https://n.nordstrommedia.com/id/sr3/603baeb0-804c-4585-8da8-00038d1500cf.jpeg?h=365&w=240&dpr=2",
  ];

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  const imageList = tempImages.map((img) => {
    return (
      <div key={img} className=" border-2 border-gray-500 border-opacity-30">
        <img className="object-cover h-72 w-full" src={img} alt="" />
      </div>
    );
  });

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>{slug}</title>
      </Helmet>
      <div key={product.id} className="flex w-full justify-between">
        <div className="w-2/3 mx-2">
          <div className="grid grid-cols-3 gap-3">{imageList}</div>
          <div className="mt-2 border-2 border-gray-500 border-opacity-30">
            <img
              className="object-cover m-auto"
              style={{ height: "460px" }}
              src={product.image}
              alt=""
            />
          </div>
        </div>
        <div className="w-1/3 mx-2">
          <StarRating
            rating={product.rating.rate}
            ratingCount={product.rating.count}
            starWidth={30}
            ratingCountStyle={"text-xl underline font-semibold"}
          />
          <h1 className="text-2xl flex items-center p-3 tracking-tight font-semibold my-2 text-slate-900">
            {product.title}
            <span className="text-4xl font-bold text-slate-900">
              ${product.price}
            </span>
          </h1>
          <h5 className="text-lg tracking-tight font-base my-2 text-slate-900">
            Mens
          </h5>
          <h6 className="text-base tracking-tight font-light my-2 text-slate-900">
            Regular Fit
          </h6>
          <ProductColorPicker />
          <ProductSizePicker />
          <div className="flex flex-col p-2">
            <button className="py-4 px-16 w-2/3 mx-auto border-r bg-black text-white text-xl m-2 ">ADD TO BAG</button>
            <button className="py-4 px-16 w-2/3 mx-auto border-r bg-slate-200 text-xl m-2">WISHLIST</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
