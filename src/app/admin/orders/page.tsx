"use client";
import { useEffect, useState } from "react";
import API from "@/lib/axios";

type Order = {
  _id: string;
  user: { name: string };
  total_amount: number;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    API.get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.user.name} - ${order.total_amount} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
