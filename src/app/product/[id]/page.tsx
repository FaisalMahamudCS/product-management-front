import axios from "axios";
import AddToCartButton from "@/component/cart/addToCartButton";

async function getProduct(id: string) {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/products/${id}`);
  return res.data;
}

export default async function ProductDetails({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="container mx-auto p-4 ">
      <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover" />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-lg">${product.price}</p>
      <AddToCartButton productId={product._id} />
    </div>
  );
}
