import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";
import ProductMiniCard from "./../components/ProductMiniCard";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHook.ts";
import { getError } from "../utils.ts";
import { ApiError } from "../types/ApiError.ts";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger" >{getError(error as ApiError)} </MessageBox>
  ) : (
    <div>
      {/* <header className="text-lg">Ecom</header> */}
        <Helmet>
          <title>Zuke</title>
        </Helmet>
        <div className="grid justify-center items-center 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {products!.map((product) => (
            <ProductMiniCard key={product.id} product={product} />
            // <div key={product.id}>{product.title}</div>
          ))}
        </div>
    </div>
  );
};

export default Home;
