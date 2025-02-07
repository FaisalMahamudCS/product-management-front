import { Product } from "@/types/type";
import axios from "axios";
import Link from "next/link";

async function getProducts() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/products`);
  console.log('res.data',   res,res.data);
  return res.data;
}

export default async function Home() {
  const products = await getProducts();
  console.log('products', products);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {products?.length > 0 && products.map((product: Product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover" />
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p>${product.price}</p>
            <Link href={`/product/${product._id}`} className="text-blue-600">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
