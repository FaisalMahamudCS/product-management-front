"use client";

import Link from "next/link";
import useCartStore from "@/lib/store/cartStore";

export default function Navbar() {
    const { cart } = useCartStore();
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <Link href="/">Home</Link>
            <Link href="/cart" className="relative">
                Cart 🛒 {cart.length > 0 && <span className="bg-red-500 text-white px-2 rounded-full ml-2">{cart.length}</span>}
            </Link>
        </nav>
    );
}
