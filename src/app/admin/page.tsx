"use client";

import { useEffect, useState } from "react";
import { Product, Category, Order } from "@/types/type";
import { useRouter } from "next/navigation";
import API from "@/lib/axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    API.get("/v1/products").then((res) => setProducts(res.data));
    API.get("/v1/categories").then((res) => setCategories(res.data));
    API.get("/v1/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Products Section */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Products</h2>
          <button 
            onClick={() => router.push("/admin/products/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Add Product
          </button>
          {products.map((product) => (
            <div key={product._id} className="border p-2 mt-2 rounded">
              <p>{product.name} - ${product.price}</p>
              <button className="text-blue-600 mr-2">Edit</button>
              <button className="text-red-600">Delete</button>
            </div>
          ))}
        </section>

        {/* Categories Section */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Categories</h2>
          <button 
            onClick={() => router.push("/admin/categories/new")}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Add Category
          </button>
          {categories.map((category) => (
            <div key={category._id} className="border p-2 mt-2 rounded">
              <p>{category.name}</p>
              <button className="text-blue-600 mr-2">Edit</button>
              <button className="text-red-600">Delete</button>
            </div>
          ))}
        </section>

        {/* Orders Section */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Orders</h2>
          {orders.map((order) => (
            <div key={order._id} className="border p-2 mt-2 rounded">
              <p>Order #{order._id} - {order.status}</p>
              <button className="text-green-600">Mark as Shipped</button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
