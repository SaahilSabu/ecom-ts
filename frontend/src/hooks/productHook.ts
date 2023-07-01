import apiClient from "../apiClient";
import { useQuery } from "react-query";
import { Product } from "../types/Product";


export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  });

  export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery<Product>({
    queryKey: ['products', slug],
    queryFn: async () => {
      const response = await apiClient.get<Product>(`api/products/${slug}`);
      console.log(response)
      return response.data;
    },
  });
