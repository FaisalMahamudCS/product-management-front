"use client";

import { create } from "zustand";
import axios from "axios";
import { CartItem } from "@/types/type";
import API from "../axios";
import { toast } from "react-toastify";

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
      const res = await API.get("/v1/carts");
      set({ cart: res.data.items });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },
  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await API.post("/v1/carts", { productId, quantity });
      if (res.status === 200) {
        // Assuming you have a toast function available
        toast.success("Item added to cart successfully");
      }

      //@ts-expect-error: Type of state.cart may not match expected type
      set((state) => ({ cart: [...state.cart, { productId, quantity }] }));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },
  removeFromCart: async (productId) => {
    try {
      await API.delete(`/v1/carts/${productId}`);
      set((state) => ({
        cart: state.cart.filter((item) => item.productId !== productId),
      }));
      
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },
}));

export default useCartStore;
