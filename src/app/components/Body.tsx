'use client'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"

const sanity = createClient({
  projectId: "587tggpl",
  dataset: "production",
  apiVersion: "2025-01-13",
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)

interface SanityProduct {
  _id: string
  name: string
  price: number
  description: string
  category: string
  stockLevel: number
  discountPercentage?: number
  isFeaturedProduct?: boolean
  image: {
    asset: {
      _ref: string
    }
  }
}

export default function Main() {
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [heroProducts, setHeroProducts] = useState<SanityProduct[]>([])
  const [topProducts, setTopProducts] = useState<SanityProduct[]>([])
  const [asgardProduct, setAsgardProduct] = useState<SanityProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [visibleTopProducts, setVisibleTopProducts] = useState(4)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const heroQuery = `*[_type == "product"][0...2] {
          _id,
          name,
          price,
          category,
          description,
          stockLevel,
          discountPercentage,
          isFeaturedProduct,
          image
        }`
        const heroData = await sanity.fetch(heroQuery)
        setHeroProducts(heroData)

        const topQuery = `*[_type == "product"][2...10] {
          _id,
          name,
          price,
          category,
          description,
          stockLevel,
          discountPercentage,
          isFeaturedProduct,
          image
        }`
        const topData = await sanity.fetch(topQuery)
        setTopProducts(topData)

        const asgardQuery = `*[_type == "product" && name match "Asgard*"][0] {
          _id,
          name,
          price,
          image
        }`
        const asgardData = await sanity.fetch(asgardQuery)
        setAsgardProduct(asgardData)

      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleWishlistToggle = (e: React.MouseEvent, productId: string) => {
    e.preventDefault()
    wishlist.includes(productId) 
      ? removeFromWishlist(productId)
      : addToWishlist(productId)
  }

  if (loading) return <div className="text-center py-24">Loading...</div>

  return (
    <main className="relative w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-[#FAF4F4] to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {heroProducts.map((product) => {
            const imageUrl = builder.image(product.image).url()
            const isInWishlist = wishlist.includes(product._id)

            return (
              <Link 
                key={product._id}
                href={`/products/${product._id}`}
                className="group relative overflow-hidden rounded-3xl shadow-xl"
              >
                <button
                  onClick={(e) => handleWishlistToggle(e, product._id)}
                  className="absolute top-4 right-4 z-20 p-3 bg-white rounded-full shadow-lg hover:bg-[#FFF9E5] transition-colors"
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg
                    className={`w-6 h-6 ${isInWishlist ? 'text-[#B88E2F] fill-current' : 'text-gray-400'}`}
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

                <div className="relative aspect-square">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <span className="text-sm bg-[#B88E2F] px-4 py-1 rounded-full">
                    {product.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-2">{product.name}</h2>
                  <p className="text-xl md:text-2xl font-medium">Rs {product.price.toFixed(2)}</p>
                  <div className="mt-6 inline-block bg-white text-black px-8 py-3 rounded-full hover:bg-[#B88E2F] hover:text-white transition-colors">
                    View Details
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Top Picks For You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our curated selection of premium furniture pieces
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topProducts.slice(0, visibleTopProducts).map((product) => {
              const imageUrl = builder.image(product.image).url()
              const originalPrice = product.discountPercentage 
                ? Math.round(product.price / (1 - product.discountPercentage/100))
                : null
              const isInWishlist = wishlist.includes(product._id)

              return (
                <Link 
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group block transition-transform hover:scale-[1.02] relative h-full"
                >
                  <button
                    onClick={(e) => handleWishlistToggle(e, product._id)}
                    className="absolute top-2 right-2 z-20 p-2 bg-white rounded-full shadow-md hover:bg-[#FFF9E5] transition-colors"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <svg
                      className={`w-6 h-6 ${isInWishlist ? 'text-[#B88E2F] fill-current' : 'text-gray-400'}`}
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

                  {product.isFeaturedProduct && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded z-10">
                      Featured
                    </div>
                  )}

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

                    <div className="flex flex-col flex-1">
                      <div className="text-center">
                        <p className="mb-1 text-sm text-gray-500">{product.category}</p>
                        <p className="mb-2 line-clamp-2 text-base font-medium text-gray-800 md:text-lg min-h-[3rem]">
                          {product.name}
                        </p>
                        <div className="mb-2 text-sm text-gray-600 line-clamp-3 min-h-[4.5rem]">
                          {product.description}
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="flex flex-col items-center gap-1">
                          <p className="text-xl font-bold text-gray-900 md:text-2xl">
                            Rs {product.price.toFixed(2)}
                          </p>
                          {originalPrice && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm line-through text-gray-500">
                                Rs {originalPrice.toFixed(2)}
                              </span>
                              <span className="text-sm font-medium text-green-600">
                                ({product.discountPercentage}% off)
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-center gap-2">
                          <span className={`text-sm ${
                            product.stockLevel > 5 
                              ? 'text-green-600' 
                              : product.stockLevel > 0 
                                ? 'text-yellow-600' 
                                : 'text-red-600'
                          }`}>
                            {product.stockLevel > 5 
                              ? 'In Stock' 
                              : product.stockLevel > 0 
                                ? `Low Stock (${product.stockLevel} left)` 
                                : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {visibleTopProducts < topProducts.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleTopProducts(prev => prev + 4)}
                className="bg-[#B88E2F] text-white px-8 py-3 rounded-full hover:bg-[#9a7727] transition-colors"
              >
                View More Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Rest of your existing sections remain unchanged */}
      {/* Asgard Sofa Section */}
      {/* Instagram Section */}
      <section className="relative h-[450px]">
  <div className="absolute inset-0">
    <Image
      src="/rectangle4.png"
      alt="Instagram"
      fill
      className="object-cover"
    />
  </div>
  <div className="relative h-full flex flex-col items-center justify-center text-center bg-black/30">
    <h2 className="text-5xl font-bold text-white mb-4">Our Instagram</h2>
    <p className="text-xl text-white mb-8">Follow our store on Instagram</p>
    <a
      href="https://www.instagram.com/iamahsanirfan/"
      target="_blank"
      rel="noopener noreferrer"
      className="px-12 py-4 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors duration-300"
    >
      Follow Us
    </a>
  </div>
</section>
    </main>
  )
}