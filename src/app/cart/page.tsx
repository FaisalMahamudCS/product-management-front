"use client";
import Link from "next/link";
import useCartStore from "@/lib/store/cartStore";
import { useEffect } from "react";

export default function CartPage() {
  const { cart, fetchCart, removeFromCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  console.log("Cart", cart);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item._id} className="flex items-center gap-3">
                <div className="flex items-center">
                  <img
                    src={item?.product?.image_url}
                    alt={item?.product?.name}
                    className="w-24 h-16 object-cover mr-4"
                  />
                  <p>{item?.product?.name} - ${item?.product?.price} x {item?.quantity}</p>
                </div>
                <button
                  onClick={() => {
                    removeFromCart(item._id)
                  fetchCart()
                  }}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link href="/checkout">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
