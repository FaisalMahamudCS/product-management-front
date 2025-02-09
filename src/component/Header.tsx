"use client";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import useCartStore from "@/lib/store/cartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { cart } = useCartStore();
  interface User {
    name: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

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
        <Link href="/" className="">
          Home
        </Link>
        <Link href="/about" className="hover:text-gray-500">
          About
        </Link>
        {user ? (
          <>
            <span>{user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="">
            Login
          </Link>
        )}
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

export default Header;