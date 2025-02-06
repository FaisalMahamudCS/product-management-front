"use client";

import useCartStore from "@/lib/store/cartStore";

export default function AddToCartButton({ productId }: { productId: string }) {
    const { addToCart } = useCartStore();

    return (
        <button
            onClick={() => addToCart(productId)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
            Add to Cart
        </button>
    );
}
