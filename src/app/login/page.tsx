"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/lib/store/userStore";

export default function Login() {
  const { setUser } = useUserStore();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", form);
    setUser(res.data.user);
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
