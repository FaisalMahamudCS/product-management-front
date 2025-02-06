"use client";

import useCartStore from "@/lib/store/cartStore";
import { useEffect } from "react";

export default function Cart() {
    const { cart, fetchCart, removeFromCart } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            {cart.length === 0 ? <p>Your cart is empty.</p> : (
                <div className="mt-4">
                    {cart.map((item) => (
                        <div key={item.productId} className="border p-4 rounded shadow flex justify-between">
                            <div>
                                <h2 className="text-lg">{item.productId}</h2>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.productId)} className="text-red-600">Remove</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
