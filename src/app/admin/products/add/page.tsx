"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", price: "", category: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/products", form);
    router.push("/admin");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Add Product</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" placeholder="Name" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input type="number" placeholder="Price" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input type="text" placeholder="Category" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
