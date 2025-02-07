"use client";
import useCartStore from "@/lib/store/cartStore";
import Link from "next/link";


const Header = () => {
    const { cart } = useCartStore();

    return (
        <header className="bg-black text-black py-4">
            <div className="container  mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    E-Shop
                </Link>
                <Link href="/login" className="text-xl font-bold">
                    Login
                </Link>
                <div className="flex gap-4">
                    <Link href="/cart" className="relative">
                        Cart 🛒
                        {cart.length > 0 && (
                            <span className="bg-red-500 text-white text-sm rounded-full px-2 absolute -top-2 -right-3">
                                {cart.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
