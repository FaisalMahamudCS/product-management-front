import { Category } from "@/types/type";
import Link from "next/link";

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  return (
    <div className="block border p-6 rounded-lg shadow-md hover:bg-gray-100 transition transform hover:scale-105">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-center mb-2">{category.name}</h3>
        <p className="text-gray-600 text-center">Explore our {category.name} collection</p>
      </div>
    </div>
  );
}