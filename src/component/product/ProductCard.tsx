import { Product } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <Link href={`/product/${product._id}`}>
        <Image
          src={product.image_url}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-40 object-cover rounded-md"
        />
        <h3 className="text-lg font-bold mt-2">{product.name}</h3>
        <p className="text-gray-600">${product.price}</p>
      </Link>
    </div>
  );
}
