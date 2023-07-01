export type Product = {
    id: string;
    slug: string;
    title: string;
    image: string;
    category: string;
    price: number;
    description: string;
    rating: {
        rate: number,
        count: number
    }
}