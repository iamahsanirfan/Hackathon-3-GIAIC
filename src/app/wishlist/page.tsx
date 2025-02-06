'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useWishlist } from '../../context/WishlistContext'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

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

const sanity = createClient({
  projectId: "587tggpl",
  dataset: "production",
  apiVersion: "2025-01-13",
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)

const ProductCard = ({ product }: { product: SanityProduct }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const imageUrl = builder.image(product.image).width(600).height(600).url()
  const isInWishlist = wishlist.includes(product._id)

  return (

    
    <div className="group block relative h-full transition-transform hover:scale-[1.02]">
      <button
        onClick={(e) => {
          e.preventDefault()
          isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id)
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
      
      <Link href={`/products/${product._id}`} className="h-full flex flex-col">
        <div className="h-full flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md md:p-6">
          <div className="relative mb-4 aspect-square overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority
            />
          </div>

          <div className="flex flex-col flex-1">
            <div className="text-center">
              <p className="mb-1 text-sm text-gray-500">{product.category}</p>
              <p className="mb-2 line-clamp-2 text-base font-medium text-gray-800 md:text-lg min-h-[3rem]">
                {product.name}
              </p>
            </div>

            <div className="mt-auto">
              <p className="text-xl font-bold text-gray-900 md:text-2xl text-center">
                Rs {product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function WishlistPage() {
  const { wishlist } = useWishlist()
  const [wishlistProducts, setWishlistProducts] = useState<SanityProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    
    const fetchWishlistProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (wishlist.length === 0) {
          setWishlistProducts([])
          return
        }

        const query = `*[_type == "product" && _id in $wishlistIds] {
          _id, name, price, description, category,
          stockLevel, discountPercentage, isFeaturedProduct, image
        }`

        const data = await sanity.fetch(query, {
          wishlistIds: wishlist
        })

        setWishlistProducts(data)
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError('Failed to load wishlist items')
          console.error('Error fetching wishlist products:', error)
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchWishlistProducts()
    return () => abortController.abort()
  }, [wishlist])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
        <p className="text-lg mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#B88E2F] text-white rounded hover:bg-[#A67C00] transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <main>
     {/* Hero Section */}
     <div className="relative h-[316px] w-full">
        <Image
          fill
          className="object-cover"
          src="/shop1.png"
          alt="Dining Table"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
          <Image
            width={77}
            height={77}
            src="/logo1.png"
            alt="Logo"
            className="h-auto w-16 md:w-20"
          />
          <h1 className="font-poppins text-3xl font-medium md:text-4xl lg:text-[48px]">Wishlist</h1>

          <div className="flex">
            <Link href="/" className="flex items-center gap-2 group">
              <p className="font-poppins font-normal text-[16px] text-black transition-colors group-hover:text-black">
                Home
              </p>
              <Image
                width={20}
                height={20}
                src="/arrow.png"
                alt="Arrow"
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="font-poppins font-normal text-[16px] text-black">
              Wishlist
            </p>
          </div>
        </div>
      </div>

      <section className="px-4 py-12 md:px-8 lg:px-16 min-h-screen">
        {wishlist.length === 0 || wishlistProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-poppins text-xl text-gray-600 mb-4">
              {wishlist.length === 0 ? 'Your wishlist is empty' : 'Some items may no longer be available'}
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-[#B88E2F] text-white font-poppins rounded-lg hover:bg-[#A57D2E] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* Policy Section */}
      <div className="bg-[#FAF4F4] px-4 py-12 md:py-24">
        <div className="mx-auto grid max-w-screen-xl gap-8 md:grid-cols-3">
          {policyItems.map((item, index) => (
            <div key={index} className="text-center">
              <h2 className="font-poppins text-2xl font-medium md:text-3xl">
                {item.title}
              </h2>
              <p className="font-poppins mx-auto mt-2 max-w-md text-base text-gray-600 md:text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

const policyItems = [
  {
    title: "Free Delivery",
    description: "For all orders over $50, consectetur adipim scing elit."
  },
  {
    title: "90 Days Return",
    description: "If goods have problems, consectetur adipim scing elit."
  },
  {
    title: "Secure Payment",
    description: "100% secure payment, consectetur adipim scing elit."
  }
]