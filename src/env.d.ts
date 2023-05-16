/// <reference types="astro/client" />

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}
export type CartProduct = Omit<Product, "description">;
export type ProductProps = Omit<Product, "quantity" | "description">;
