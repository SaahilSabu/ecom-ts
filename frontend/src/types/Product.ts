export type Product = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  images: string[];
  description: string;
  color: string;
  price: number;
  rating: { rate: number; count: number };
  sizes: { size: string; count: number }[];
  isFeatured: boolean;
  banner?: string;
};
