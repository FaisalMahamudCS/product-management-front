"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      <Link href="/admin/categories/create" className="bg-blue-500 text-white p-2 rounded">Add Category</Link>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="flex justify-between">
            {category.name}
            <Link href={`/admin/categories/edit?id=${category._id}`} className="text-blue-500">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
