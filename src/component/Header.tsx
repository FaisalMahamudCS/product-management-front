"use client";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import useCartStore from "@/lib/store/cartStore";
import Link from "next/link";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { cart } = useCartStore();


  return (
    <header className="flex flex-row items-center justify-between sm:justify-around p-2 border-b-2 mx-4">
      <a
        href="/"
        className="flex items-center h-10 px-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90"
      >
        Title
      </a>
      <nav className="hidden flex justify-between items-center gap-4 font-semibold">
      <Link href="/" className="text-xl font-bold">
                    E-Shop
                </Link>
                <Link href="/login" className="">
                    Login
                </Link>
                   
        <a href="#" className="hover:text-gray-500">
          Home
        </a>
        <a href="#" className="hover:text-gray-500">
          About
        </a>
        <a href="#" className="hover:text-gray-500">
          Contact
        </a>
      </nav>
      <nav className="sm:hidden flex flex-col items-end gap-1 font-semibold">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden font-bold text-xl hover:text-gray-500"
        >
        </button>
        <Link href="/cart" className="relative">
                        Cart 🛒
                        {cart.length > 0 && (
                            <span className="bg-red-500 text-white text-sm rounded-full px-2 absolute -top-2 -right-3">
                                {cart.length}
                            </span>
                        )}
                    </Link>
        {showMenu && (
          <>
            <a href="#" className="hover:text-gray-500">
              Home
            </a>
            <a href="#" className="hover:text-gray-500">
              About
            </a>
            <a href="#" className="hover:text-gray-500">
              Contact
            </a>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header