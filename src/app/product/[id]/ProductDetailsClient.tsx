"use client";

import axios from "axios";
import AddToCartButton from "@/component/cart/addToCartButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/utils/authUtils";

interface Product {
  _id: string;
  name: string;
  price: number;
  image_url: string;
}

const ProductDetailsClient: React.FC = () => {
  const [auth, setAuth] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setAuth(isAuthenticated());

    const fetchProduct = async () => {
      if (id) {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/products/${id}`);
          setProduct(res.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover" />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-lg">${product.price}</p>
      {auth ? (
        <AddToCartButton productId={product._id} />
      ) : (
        <button onClick={() => router.push("/login")} className="bg-blue-500 text-white px-4 py-2 rounded">
          Log in to add to cart
        </button>
      )}
    </div>
  );
};

export default ProductDetailsClient;