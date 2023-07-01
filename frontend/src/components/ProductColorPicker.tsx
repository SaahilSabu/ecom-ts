import { useState } from "react";

type Props = {
  color: string;
};

const ProductColorPicker = (props: Props) => {
  const { color } = props;
  const [selectedColor, setSelectedColor] = useState(color);
  return (
    <div>
      <h1 className="font-bold">
        COLOR: <span className="font-light">{selectedColor}</span>
      </h1>
      <div className="grid grid-cols-5 p-1">
        <img
          src="https://cdn.shopify.com/s/files/1/1367/5201/products/ApexRun5_Short_Option1_Black-A3A7Z-UBZF-1526.158_3dd28912-472c-4ccb-aab8-ee35b4e5b320_1920x.jpg?v=1676993764"
          alt=""
          onClick={() => setSelectedColor("Black")}
          className={`h-24 m-1  border-2 border-gray-300 ${
            "Black" === selectedColor ? "border-3 border-black" : ""
          }`}
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1367/5201/products/ApexRun5Short_Option1_LightGrey-A3A7Z-GBCM-1475.110_1920x.jpg?v=1679397252"
          alt=""
          onClick={() => setSelectedColor("Grey")}
          className={`h-24 m-1  border-2 border-gray-300 ${
            "Grey" === selectedColor ? "border-3 border-black" : ""
          }`}
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1367/5201/products/ApexRun5Short_Option1_FireflyGreen-A3A7Z-EBF3-1027.72_1920x.jpg?v=1679397252"
          alt=""
          onClick={() => setSelectedColor("Yellow")}
          className={`h-24 m-1  border-2 border-gray-300 ${
            "Yellow" === selectedColor ? "border-3 border-black" : ""
          }`}
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1367/5201/products/ApexRun5Short_Option1_InkTeal-A3A7Z-TBGF3.96_828x.jpg?v=1679397252"
          alt=""
          onClick={() => setSelectedColor("Green")}
          className={`h-24 m-1  border-2 border-gray-300 ${
            "Green" === selectedColor ? "border-3 border-black" : ""
          }`}
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1367/5201/products/ApexRun5_Short_Option1_EveningBlue-A3A7Z-UBZF-1423.104_828x.jpg?v=1679397251"
          alt=""
          onClick={() => setSelectedColor("Blue")}
          className={`h-24 m-1  border-2 border-gray-300 ${
            "Blue" === selectedColor ? "border-3 border-black" : ""
          }`}
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1367/5201/products/ApexRun5Short_Option1_SolsticeOrange-A3A7Z-OBJ0-1137.79_828x.jpg?v=1682448539"
          alt=""
          onClick={() => setSelectedColor("Orange")}
          className={`h-24 m-1  border-2 border-gray-300 ${
            "Orange" === selectedColor ? "border-3 border-black" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default ProductColorPicker;
