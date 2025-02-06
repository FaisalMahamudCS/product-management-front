"use client";

import { create } from "zustand";
import axios from "axios";
import { CartItem } from "@/types";

type CartState = {
  cart: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
};

const useCartStore = create<CartState>((set) => ({
  cart: [],
  fetchCart: async () => {
    try {
      const res = await axios.get("/api/cart");
      set({ cart: res.data.items });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },
  addToCart: async (productId, quantity = 1) => {
    try {
      await axios.post("/api/cart", { productId, quantity });
      set((state) => ({ cart: [...state.cart, { productId, quantity }] }));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },
  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/api/cart/${productId}`);
      set((state) => ({
        cart: state.cart.filter((item) => item.productId !== productId),
      }));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },
}));

export default useCartStore;
