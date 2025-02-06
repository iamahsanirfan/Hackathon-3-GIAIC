// app/search/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

const sanity = createClient({
  projectId: "587tggpl",
  dataset: "production",
  apiVersion: "2025-01-13",
  useCdn: true,
});

const builder = imageUrlBuilder(sanity);

interface SanityProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stockLevel: number;
  discountPercentage?: number;
  image: {
    asset: {
      _ref: string;
    };
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchResults = await sanity.fetch(
          `*[_type == "product" && (
            name match $query ||
            description match $query ||
            category match $query
          )]{
            _id, name, price, description, category,
            stockLevel, discountPercentage, image
          }`,
          { query: `*${query}*` }
        );
        setProducts(searchResults);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  const handleWishlistToggle = (productId: string) => {
    wishlist.includes(productId) 
      ? removeFromWishlist(productId)
      : addToWishlist(productId);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light mb-8">
          Search Results for "{query}"
        </h1>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const imageUrl = builder.image(product.image).width(600).height(600).url();
              const originalPrice = product.discountPercentage 
                ? Math.round(product.price / (1 - product.discountPercentage/100))
                : null;
              const isInWishlist = wishlist.includes(product._id);

              return (
                <div key={product._id} className="group relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => handleWishlistToggle(product._id)}
                    className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg hover:bg-[#FFF9E5] transition-all"
                  >
                    <svg
                      className={`w-6 h-6 ${
                        isInWishlist ? 'text-[#B88E2F] fill-current' : 'text-gray-300'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>

                  <Link href={`/products/${product._id}`}>
                    <div className="aspect-square relative mb-4 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </Link>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-xl ${
                        product.discountPercentage ? 'text-red-500' : 'text-gray-900'
                      }`}>
                        Rs {product.price.toFixed(2)}
                      </p>
                      {product.discountPercentage && (
                        <p className="text-sm text-gray-500 line-through">
                          Rs {originalPrice?.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product._id, 1, product.price)}
                      className="w-full bg-[#B88E2F] text-white py-2 rounded-md hover:bg-[#A67C00] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]" />
  </div>
);