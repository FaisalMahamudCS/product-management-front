"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/lib/store/userStore";
import API from "@/lib/axios";
import Link from "next/link";

export default function Login() {
  const { setUser } = useUserStore();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await API.post("/v1/auth/login", form);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.tokens.access.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    if(res.data.user.role === "admin") {
      router.push("/admin");
    } else {    
      router.push("/"); 
    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 mr-3 text-white px-4 py-2 rounded">Login</button>
        
        <Link href="/register" className="text-blue-500">Create an account</Link>
      </form>
    </div>
    </div>
  );
}
