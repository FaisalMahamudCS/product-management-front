"use client";

import useCartStore from "@/lib/store/cartStore";
import { useEffect } from "react";
import API from "@/lib/axios";
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function Checkout() {
    const { cart, fetchCart } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, []);

    const placeOrder = async () => {
        await API.post('/v1/orders', { items: cart });
        toast.success('Order placed successfully!');
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-4'>Checkout</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className='space-y-4'>
                    {cart.map((item) => (
                        <div key={item?.product?._id} className='flex items-center p-4 border rounded shadow-md'>
                            <img src={item?.product?.image_url} alt={item?.product?.name} className='w-24 h-16 object-cover mr-4' />
                            <div className='flex-1'>
                                <p className='font-semibold'>{item?.product?.name}</p>
                                <p>
                                    ${item?.product?.price} x {item?.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                    <button onClick={placeOrder} className='bg-green-600 text-white px-4 py-2 rounded mt-4'>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
}