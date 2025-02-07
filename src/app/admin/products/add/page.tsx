"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import API from "@/lib/axios";

export default function AddProduct() {
    const router = useRouter();
    const [categories, setCategories] = useState<{ _id: string, name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await API.get("/v1/categories");
            setCategories(response.data);
        };
        fetchCategories();
    }, []);
    const [form, setForm] = useState({ name: "", price: "", category: "", image_url: "", description: "" });
    const [image, setImage] = useState<File | null>(null);
console.log(form)
    const handleImageUpload = async () => {
        if (!image) return "";
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, formData);
        return response.data.data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const imageUrl = await handleImageUpload();
        await API.post("/v1/products", { ...form, image_url : imageUrl });
        router.push("/admin");
    };

    console.log(categories,categories?.length)
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
                <textarea placeholder="Description" className="border p-2 w-full mb-2"
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <select className="border p-2 w-full mb-2"
                    onChange={(e) => setForm({ ...form, category: (e.target as HTMLSelectElement).value })}
                >
                    <option value="">Select Category</option>
                    {categories?.length > 0 && categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <input type="file" className="border p-2 w-full mb-2"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </form>
        </div>
    );
}
