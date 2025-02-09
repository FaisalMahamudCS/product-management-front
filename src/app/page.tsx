//import { Product, Category } from "@/types";
import ProductCard from "@/component/product/ProductCard";
import CategoryCard from "@/component/CategoryCard";
import { fetchProducts, fetchCategories } from "@/api/product";
import { Category, Product } from "@/types/type";

export default async function Home() {
  // Fetch featured products and categories (Server-side)
  const products = await fetchProducts({ featured: true });
  console.log("PRODUCT",products)
  const categories = await fetchCategories();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Categories Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories?.length > 0 && categories.map((category: Category) => (
            <CategoryCard key={category._id} category={category} />
            ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.length > 0 && products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </section>
    </main>
  );
}
