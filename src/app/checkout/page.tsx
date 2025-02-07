"use client";

import useCartStore from "@/lib/store/cartStore";
import { useEffect } from "react";
import axios from "axios";
import API from "@/lib/axios";

export default function Checkout() {
  const { cart, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  const  placeOrder = async () => {
    await API.post("/v1/orders", { items: cart });
    alert("Order placed successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Checkout</h1>

      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cart.map((item) => (
            <p key={item.productId}>Product ID: {item.productId} - Quantity: {item.quantity}</p>
          ))}
          <button onClick={placeOrder} className="bg-green-600 text-white px-4 py-2 rounded mt-4">Place Order</button>
        </div>
      )}
    </div>
  );
}
 