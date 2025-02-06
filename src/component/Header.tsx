"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

const Header = () => {
    const { cartItems } = useCart();

    return (
        <header className="bg-gray-900 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    E-Shop
                </Link>
                <div className="flex gap-4">
                    <Link href="/cart" className="relative">
                        Cart 🛒
                        {cartItems.length > 0 && (
                            <span className="bg-red-500 text-white text-sm rounded-full px-2 absolute -top-2 -right-3">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
