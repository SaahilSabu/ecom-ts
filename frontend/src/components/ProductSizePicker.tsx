import { useState } from "react";

type Size = {
  size: string;
  count: number;
};

type Props = {
  avSizes: Size[];
};

const ProductSizePicker = (props: Props) => {
  const { avSizes } = props;
  const [selectedSize, setSelectedSize] = useState("Black");
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  return (
    <div>
      <h3 className="font-bold">SELECT SIZE</h3>
      <div className="flex flex-wrap">
        {sizes.map((size, index) => {
          const sizeAvailable = avSizes[index]?.count > 0;
          return (
            <button
              key={size}
              className={`border-2 w-28 p-2 m-1 border-slate-500 ${
                size === selectedSize
                  ? "bg-black text-white border-red-500"
                  : ""
              } ${
                !sizeAvailable
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={() => setSelectedSize(size)}
              disabled={!sizeAvailable}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSizePicker;
