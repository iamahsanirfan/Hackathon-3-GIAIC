// app/components/rocketSeat.tsx
'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

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
  isFeaturedProduct?: boolean;
  image: {
    asset: {
      _ref: string;
    };
  };
}

export default function RocketSeatProduct() {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<SanityProduct[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [loading, setLoading] = useState(true);

  // Static product data
  const selectedProduct = {
    _id: 'rocket-seater-001',
    name: 'Rocket Seater',
    price: 10000,
    description: 'Premium ergonomic single seater chair with advanced lumbar support. Features premium leather upholstery and adjustable armrests.',
    category: 'Premium Chairs',
    stockLevel: 10,
    discountPercentage: 15,
    image: {
      asset: {
        _ref: 'dummy-ref' // Not used but required by interface
      }
    }
  };

  const imageUrl = '/seat.png'; // Static image path

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const related = await sanity.fetch(
          `*[_type == "product" && _id != $productId] | order(_createdAt desc) {
            _id, name, price, description, category,
            stockLevel, discountPercentage, isFeaturedProduct, image
          }`,
          { productId: selectedProduct._id }
        );
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, []);

  const handleAddToCart = () => {
    addToCart(selectedProduct._id, quantity, selectedProduct.price);
  };

  const handleWishlistToggle = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    wishlist.includes(productId) 
      ? removeFromWishlist(productId)
      : addToWishlist(productId);
  };

  const loadMoreProducts = () => setVisibleProducts(prev => prev + 4);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="bg-white">
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex justify-between items-center">
          <Breadcrumbs productName={selectedProduct.name} />
          <WishlistCounter wishlist={wishlist} />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 grid lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative">
          <WishlistButton 
            productId={selectedProduct._id}
            wishlist={wishlist}
            onToggle={handleWishlistToggle}
          />
          <div className="relative aspect-square">
            <Image
              src={imageUrl}
              alt={selectedProduct.name}
              fill
              priority
              quality={100}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {selectedProduct.discountPercentage && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {selectedProduct.discountPercentage}% OFF
              </div>
            )}
          </div>
        </div>

        <ProductDetails 
          product={selectedProduct}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
          onWishlistToggle={handleWishlistToggle}
          wishlist={wishlist}
        />
      </div>

      <RelatedProductsSection
        products={relatedProducts}
        visibleCount={visibleProducts}
        wishlist={wishlist}
        onLoadMore={loadMoreProducts}
        onWishlistToggle={handleWishlistToggle}
      />
    </main>
  );
}

// Helper Components
const WishlistCounter = ({ wishlist }: { wishlist: string[] }) => (
  <Link href="/wishlist" className="flex items-center gap-2 group relative">
    <svg className="w-6 h-6 text-[#B88E2F]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    {wishlist.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-[#B88E2F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {wishlist.length}
      </span>
    )}
  </Link>
);

const Breadcrumbs = ({ productName }: { productName: string }) => (
  <div className="flex items-center space-x-3 text-sm">
    <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
      Home
    </Link>
    <span className="text-gray-400">/</span>
    <Link href="/shop" className="text-gray-500 hover:text-gray-700 transition-colors">
      Shop
    </Link>
    <span className="text-gray-400">/</span>
    <span className="text-gray-600 truncate max-w-[200px]">{productName}</span>
  </div>
);

const WishlistButton = ({ 
  productId,
  wishlist,
  onToggle
}: { 
  productId: string;
  wishlist: string[];
  onToggle: (e: React.MouseEvent, productId: string) => void;
}) => (
  <button
    onClick={(e) => onToggle(e, productId)}
    className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg hover:bg-[#FFF9E5] transition-all"
  >
    <svg
      className={`w-8 h-8 transition-colors ${
        wishlist.includes(productId)
          ? 'text-[#B88E2F] fill-current'
          : 'text-gray-300 hover:text-[#B88E2F]'
      }`}
      stroke="currentColor"
      fill="none"
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
);

const ProductDetails = ({
  product,
  quantity,
  onQuantityChange,
  onAddToCart,
  onWishlistToggle,
  wishlist
}: {
  product: any;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onAddToCart: () => void;
  onWishlistToggle: (e: React.MouseEvent, productId: string) => void;
  wishlist: string[];
}) => (
  <div className="space-y-6">
    <h1 className="text-4xl font-light text-gray-900">{product.name}</h1>
    <PriceDisplay 
      price={product.price}
      discount={product.discountPercentage}
    />
    <StockStatus stock={product.stockLevel} />
    <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
    
    <div className="flex flex-wrap gap-4">
      <QuantitySelector 
        quantity={quantity}
        onDecrement={() => onQuantityChange(Math.max(1, quantity - 1))}
        onIncrement={() => onQuantityChange(quantity + 1)}
      />
      <AddToCartButton 
        stock={product.stockLevel}
        onClick={onAddToCart}
      />
      <WishlistToggleButton
        productId={product._id}
        isInWishlist={wishlist.includes(product._id)}
        onToggle={onWishlistToggle}
      />
    </div>

    <ProductMeta 
      category={product.category}
      stock={product.stockLevel}
      discount={product.discountPercentage}
    />
  </div>
);

const PriceDisplay = ({ price, discount }: { price: number; discount?: number }) => (
  <div className="flex items-baseline gap-4">
    <p className={`text-3xl ${discount ? 'text-red-500' : 'text-gray-900'}`}>
      Rs {price.toFixed(2)}
    </p>
    {discount && (
      <p className="text-xl text-gray-400 line-through">
        Rs {Math.round(price / (1 - discount/100)).toFixed(2)}
      </p>
    )}
  </div>
);

const StockStatus = ({ stock }: { stock: number }) => (
  <p className={`text-lg ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
    {stock > 0 ? `${stock} items in stock` : 'Currently out of stock'}
  </p>
);

const QuantitySelector = ({
  quantity,
  onDecrement,
  onIncrement
}: {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) => (
  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
    <button
      onClick={onDecrement}
      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      -
    </button>
    <span className="px-6 py-3 bg-white text-lg">{quantity}</span>
    <button
      onClick={onIncrement}
      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      +
    </button>
  </div>
);

const AddToCartButton = ({ stock, onClick }: { stock: number; onClick: () => void }) => (
  <button
    onClick={onClick}
    disabled={stock === 0}
    className={`flex-1 px-8 py-4 text-lg font-medium rounded-lg transition-colors ${
      stock > 0 
        ? 'bg-[#B88E2F] text-white hover:bg-[#A67C00]' 
        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
  >
    {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
  </button>
);

const WishlistToggleButton = ({
  productId,
  isInWishlist,
  onToggle
}: {
  productId: string;
  isInWishlist: boolean;
  onToggle: (e: React.MouseEvent, productId: string) => void;
}) => (
  <button
    onClick={(e) => onToggle(e, productId)}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-colors ${
      isInWishlist
        ? 'border-[#B88E2F] bg-[#FFF9E5] text-[#B88E2F]'
        : 'border-gray-200 hover:border-[#B88E2F] text-gray-600'
    }`}
  >
    <svg
      className={`w-5 h-5 ${isInWishlist ? 'fill-current' : 'fill-none'}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
    {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
  </button>
);

const ProductMeta = ({ category, stock, discount }: { 
  category: string;
  stock: number;
  discount?: number;
}) => (
  <div className="space-y-3 pt-6 border-t border-gray-200">
    <MetaItem label="Category" value={category} />
    <MetaItem label="Stock" value={stock} />
    {discount && <MetaItem label="Discount" value={`${discount}%`} />}
  </div>
);

const MetaItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between max-w-xs">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

const RelatedProductsSection = ({
  products,
  visibleCount,
  wishlist,
  onLoadMore,
  onWishlistToggle
}: {
  products: SanityProduct[];
  visibleCount: number;
  wishlist: string[];
  onLoadMore: () => void;
  onWishlistToggle: (e: React.MouseEvent, productId: string) => void;
}) => {
  const hasMoreProducts = products.length > visibleCount;

  return (
    <section className="bg-gray-50 px-4 py-12 md:px-8 md:py-24 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12">Related Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, visibleCount).map((product) => (
            <RelatedProductCard
              key={product._id}
              product={product}
              isInWishlist={wishlist.includes(product._id)}
              onWishlistToggle={onWishlistToggle}
            />
          ))}
        </div>
        {hasMoreProducts && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={onLoadMore}
              className="px-8 py-3 border-2 border-[#B88E2F] text-[#B88E2F] rounded-full hover:bg-[#B88E2F] hover:text-white transition-colors"
            >
              View More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const RelatedProductCard = ({
  product,
  isInWishlist,
  onWishlistToggle
}: {
  product: SanityProduct;
  isInWishlist: boolean;
  onWishlistToggle: (e: React.MouseEvent, productId: string) => void;
}) => {
  const imageUrl = builder.image(product.image).width(600).height(600).url();
  const originalPrice = product.discountPercentage 
    ? Math.round(product.price / (1 - product.discountPercentage/100))
    : null;

  return (
    <Link 
      href={`/products/${product._id}`}
      className="group block transition-transform hover:scale-[1.02] relative h-full"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          onWishlistToggle(e, product._id);
        }}
        className="absolute top-2 right-2 z-20 p-2 bg-white rounded-full shadow-md hover:bg-[#FFF9E5] transition-all"
      >
        <svg
          className={`w-6 h-6 ${isInWishlist ? 'text-[#B88E2F] fill-current' : 'text-gray-300'}`}
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

      <div className="h-full flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md md:p-6">
        <div className="relative mb-4 aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        <div className="text-center">
          <p className="mb-1 text-sm text-gray-500">{product.category}</p>
          <p className="mb-2 line-clamp-2 text-base font-medium text-gray-800 md:text-lg min-h-[3rem]">
            {product.name}
          </p>
          <div className="mb-2 text-sm text-gray-600 line-clamp-3 min-h-[4.5rem]">
            {product.description}
          </div>
        </div>

        
      </div>
    </Link>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]" />
  </div>
);