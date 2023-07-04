import bcrypt from "bcryptjs";
import { Product } from "./models/productModel";
import { ObjectId } from "mongodb";
import { User } from "./models/userModel";

export const sampleProducts: Product[] = [
  {
    slug: "foldsack-backpack",
    name: "Fjallraven - Foldsack Backpack",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    images: [],
    rating: { rate: 3.9, count: 120 },
    sizes: [
      { size: "XS", count: 0 },
      { size: "S", count: 10 },
      { size: "M", count: 20 },
      { size: "L", count: 0 },
      { size: "XL", count: 40 },
      { size: "XXL", count: 5 },
      { size: "3XL", count: 1 },
    ],
    color: "Blue",
    isFeatured: false,
  },
  {
    slug: "premium-t-shirts",
    name: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    images: [],
    rating: { rate: 4.1, count: 259 },
    sizes: [
      { size: "XS", count: 10 },
      { size: "S", count: 20 },
      { size: "M", count: 40 },
      { size: "L", count: 60 },
      { size: "XL", count: 10 },
      { size: "XXL", count: 10 },
      { size: "3XL", count: 0 },
    ],
    color: "Black",
    isFeatured: false,
  },
  {
    slug: "cotton-jacket",
    name: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm-hearted love to Father, husband, or son on this Thanksgiving or Christmas Day.",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    images: [],
    rating: { rate: 4.7, count: 500 },
    sizes: [
      { size: "XS", count: 30 },
      { size: "S", count: 10 },
      { size: "M", count: 50 },
      { size: "L", count: 0 },
      { size: "XL", count: 0 },
      { size: "XXL", count: 20 },
      { size: "3XL", count: 0 },
    ],
    color: "Green",
    isFeatured: false,
  },
  {
    slug: "casual-slim-fit",
    name: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color coBlueuld be slightly different between on the screen and in practice. Please note that body builds vary by person; therefore, detailed",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    images: [],
    rating: { rate: 2.1, count: 430 },
    sizes: [
      { size: "XS", count: 0 },
      { size: "S", count: 0 },
      { size: "M", count: 0 },
      { size: "L", count: 0 },
      { size: "XL", count: 10 },
      { size: "XXL", count: 0 },
      { size: "3XL", count: 0 },
    ],
    color: "Pink",
    isFeatured: false,
  },
  {
    slug: "legends-naga-gold",
    name: "John Hardy Women's Legends Naga Gold",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    images: [],
    rating: { rate: 4.6, count: 400 },
    sizes: [
      { size: "XS", count: 0 },
      { size: "S", count: 0 },
      { size: "M", count: 0 },
      { size: "L", count: 10 },
      { size: "XL", count: 10 },
      { size: "XXL", count: 0 },
      { size: "3XL", count: 10 },
    ],
    color: "Blue",
    isFeatured: false,
  },
  // Add more products here...
];

export const sampleUsers: User[] = [
  {
    name: "Joe",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "John",
    email: "user@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: false,
  },
];
