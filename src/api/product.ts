import { Product, Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Fetch Products
export const fetchProducts = async (params?: { featured?: boolean }) => {
  const url = new URL(`${API_URL}/products`);
  if (params?.featured) url.searchParams.append("featured", "true");

  const res = await fetch(url.toString(), { cache: "no-store" });
  return (await res.json()) as Product[];
};

// Fetch Categories
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, { cache: "no-store" });
  return (await res.json()) as Category[];
};
    