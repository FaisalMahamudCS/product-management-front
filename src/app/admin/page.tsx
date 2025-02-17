"use client";

import { useEffect, useState } from "react";
import { Product, Category, Order } from "@/types/type";
import API from "@/lib/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAddCategoryPopupOpen, setIsAddCategoryPopupOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<Product | Category | null>(null);
  const [currentDeleteItem, setCurrentDeleteItem] = useState<Product | Category | null>(null);
  const [newCategory, setNewCategory] = useState<Category>({ _id: '', name: '' });
  const router = useRouter();

  useEffect(() => {
    //it was stringified pls parse
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userRole = user.role;

    if (userRole !== "admin") {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      toast.error("You are not authorized to access this page.");
      router.push("/login");
    } else {
      API.get("/v1/products").then((res) => setProducts(res.data));
      API.get("/v1/categories").then((res) => setCategories(res.data));
      API.get("/v1/orders").then((res) => setOrders(res.data));
    }
  }, [router]);

  const handleEditClick = (item: Product | Category) => {
    setCurrentEditItem(item);
    setIsEditPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setCurrentEditItem(null);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentEditItem) {
      try {
        if ('price' in currentEditItem) {
          await API.put(`/v1/products/${currentEditItem._id}`, currentEditItem);
          const updatedProducts = products.map((product) =>
            product._id === currentEditItem._id ? currentEditItem : product
          );
          setProducts(updatedProducts);
        } else {
          await API.put(`/v1/categories/${currentEditItem._id}`, currentEditItem);
          const updatedCategories = categories.map((category) =>
            category._id === currentEditItem._id ? currentEditItem : category
          );
          setCategories(updatedCategories);
        }
        handleClosePopup();
      } catch (error) {
        console.error("Failed to update item", error);
      }
    }
  };

  const handleDeleteClick = (item: Product | Category) => {
    setCurrentDeleteItem(item);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (currentDeleteItem) {
      try {
        if ('price' in currentDeleteItem) {
          await API.delete(`/v1/products/${currentDeleteItem._id}`);
          setProducts(products.filter((product) => product._id !== currentDeleteItem._id));
        } else {
          await API.delete(`/v1/categories/${currentDeleteItem._id}`);
          setCategories(categories.filter((category) => category._id !== currentDeleteItem._id));
        }
        setIsDeletePopupOpen(false);
        setCurrentDeleteItem(null);
      } catch (error) {
        console.error("Failed to delete item", error);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
    setCurrentDeleteItem(null);
  };

  const handleAddCategoryClick = () => {
    setIsAddCategoryPopupOpen(true);
  };

  const handleAddCategoryClose = () => {
    setIsAddCategoryPopupOpen(false);
    setNewCategory({ _id: '', name: '' });
  };

  const handleAddCategorySave = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { _id, ...categoryData } = newCategory; // Exclude _id from the new category data
      const response = await API.post("/v1/categories", categoryData);
      setCategories([...categories, response.data]);
      handleAddCategoryClose();
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

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
              <button className="text-blue-600 mr-2" onClick={() => handleEditClick(product)}>Edit</button>
              <button className="text-red-600" onClick={() => handleDeleteClick(product)}>Delete</button>
            </div>
          ))}
        </section>

        {/* Categories Section */}
        <section className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Categories</h2>
          <button 
            onClick={handleAddCategoryClick}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Add Category
          </button>
          {categories.map((category) => (
            <div key={category._id} className="border p-2 mt-2 rounded">
              <p>{category.name}</p>
              <button className="text-blue-600 mr-2" onClick={() => handleEditClick(category)}>Edit</button>
              <button className="text-red-600" onClick={() => handleDeleteClick(category)}>Delete</button>
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

      {isEditPopupOpen && currentEditItem && (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="popup-content bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold">Edit {currentEditItem.name}</h2>
            <form onSubmit={handleSave}>
              <div>
                <label htmlFor="name">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  defaultValue={currentEditItem.name} 
                  className="border p-2 rounded w-full" 
                  onChange={(e) => setCurrentEditItem({ ...currentEditItem, name: e.target.value })}
                />
              </div>
              {currentEditItem.hasOwnProperty('price') && (
                <div>
                  <label htmlFor="price">Price:</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    defaultValue={(currentEditItem as Product).price} 
                    className="border p-2 rounded w-full" 
                    onChange={(e) => setCurrentEditItem({ ...currentEditItem, price: parseFloat(e.target.value) })}
                  />
                </div>
              )}
              <div className="mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
                <button type="button" onClick={handleClosePopup} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeletePopupOpen && currentDeleteItem && (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="popup-content bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold">Confirm Delete</h2>
            <p>Are you sure you want to delete {currentDeleteItem.name}?</p>
            <div className="mt-4">
              <button onClick={handleConfirmDelete} className="bg-red-600 text-white px-4 py-2 rounded mr-2">Delete</button>
              <button onClick={handleCancelDelete} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isAddCategoryPopupOpen && (
        <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="popup-content bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold">Add Category</h2>
            <form onSubmit={handleAddCategorySave}>
              <div>
                <label htmlFor="categoryName">Name:</label>
                <input 
                  type="text" 
                  id="categoryName" 
                  name="categoryName" 
                  value={newCategory.name} 
                  className="border p-2 rounded w-full" 
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Save</button>
                <button type="button" onClick={handleAddCategoryClose} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
