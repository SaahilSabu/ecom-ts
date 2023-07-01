import { useState } from "react";

type Props = {};

const ProductSizePicker = (props: Props) => {
  const [selectedSize, setSelectedSize] = useState("Black");
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  return (
    <div>
      <h3 className="font-bold">SELECT SIZE</h3>
      <div className="flex flex-wrap">
        {sizes.map((size) => {
          return (
            <div
              className={`border-2 w-28 p-2 m-1 border-b-slate-500 ${
                size === selectedSize ? "bg-black text-white border-b-red-500" : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSizePicker;
