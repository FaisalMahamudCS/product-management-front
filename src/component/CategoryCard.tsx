import { Category } from "@/types/type";
import Link from "next/link";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <Link href={`/category/${category._id}`} className="border p-4 rounded-lg shadow-md hover:bg-gray-100 transition">
      <h3 className="text-lg font-bold">{category.name}</h3>
    </Link>
  );
}
