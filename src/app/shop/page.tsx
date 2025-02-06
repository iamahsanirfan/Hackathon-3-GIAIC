'use client'
import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { useWishlist } from '@/context/WishlistContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  discountPercentage?: number
  isFeaturedProduct?: boolean
  stockLevel: number
  category: string
  image: {
    asset: {
      _ref: string
    }
  }
}

type ViewMode = 'grid' | 'list'
type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc'

export default function Shop() {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [products, setProducts] = useState<SanityProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<SanityProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [itemsPerPage, setItemsPerPage] = useState(16)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] {
          _id,
          name,
          price,
          description,
          discountPercentage,
          isFeaturedProduct,
          stockLevel,
          category,
          image {
            asset {
              _ref
            }
          }
        }`

        // Use a generic to tell TypeScript that data is an array of SanityProduct
        const data = await sanity.fetch<SanityProduct[]>(query)
        setProducts(data)
        setFilteredProducts(data)
        
        const uniqueCategories = Array.from(
          new Set(data.map((p: SanityProduct) => p.category).filter(c => c))
        ) as string[]
        setCategories(uniqueCategories)
        
        setError(null)
      } catch (err) {
        setError('Failed to load products')
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category))
    }

    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name_asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name_desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        break
    }
    
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [sortBy, selectedCategories, products])

  useEffect(() => {
    setCurrentPage(1)
  }, [itemsPerPage])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleWishlistToggle = (e: React.MouseEvent, productId: string) => {
    e.preventDefault()
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(productId)
      toast.success('Added to wishlist')
    }
  }

  if (loading) return <div className="text-center py-12">Loading products...</div>
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>

  return (
    <main>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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
          <h1 className="font-poppins text-3xl font-medium md:text-4xl lg:text-[48px]">Shop</h1>

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
              Shop
            </p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="w-full bg-[#FAF4F4] relative">
        <div className="mx-auto flex h-auto flex-col justify-between gap-4 px-4 py-4 md:h-[100px] md:flex-row md:items-center md:px-8 lg:px-16">
          <div className="flex flex-wrap items-center gap-4 relative">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Image width={25} height={25} src="/filter.png" alt="Filter" />
              <p className="font-poppins text-base md:text-[20px]">Filter</p>
            </div>
            
            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="absolute left-0 top-full mt-2 z-50 bg-white shadow-xl rounded-lg p-4 md:w-64 w-full">
                <h3 className="font-poppins text-lg font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label 
                      key={category}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="form-checkbox h-5 w-5 text-[#B88E2F] rounded border-gray-300 focus:ring-[#B88E2F]"
                      />
                      <span className="font-poppins text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1 ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50'}`}
              >
                <Image width={28} height={28} src="/grid.png" alt="Grid view" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1 ${viewMode === 'list' ? 'opacity-100' : 'opacity-50'}`}
              >
                <Image width={24} height={24} src="/view.png" alt="List view" />
              </button>
            </div>

            <div className="hidden h-6 w-px bg-[#000000] md:block" />

            <p className="font-poppins text-sm md:text-base">
              Showing {startIndex + 1}–{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} results
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="font-poppins text-base md:text-[20px]">Show</p>
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="flex h-8 w-12 items-center justify-center rounded border border-[#D9D9D9] bg-white md:h-10"
              >
                {[16, 32, 64].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-poppins text-base md:text-[20px]">Sort by</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="flex h-8 w-32 items-center rounded border border-[#D9D9D9] bg-white px-3 md:h-10 md:w-48"
              >
                <option value="default">Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A-Z</option>
                <option value="name_desc">Name: Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section className="bg-gray-50 px-4 py-12 md:px-8 md:py-24 lg:px-16">
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {currentProducts.map((product) => {
            const imageUrl = builder.image(product.image).width(600).height(600).url()
            const originalPrice = product.discountPercentage 
              ? Math.round(product.price / (1 - product.discountPercentage / 100))
              : null
            const isInWishlist = wishlist.includes(product._id)

            return (
              <Link 
                key={product._id}
                href={`/products/${product._id}`}
                className={`group block transition-transform hover:scale-[1.02] relative h-full ${viewMode === 'list' ? 'flex gap-6 items-center' : ''}`}
              >
                <button
                  onClick={(e) => handleWishlistToggle(e, product._id)}
                  className={`absolute top-2 right-2 z-20 p-2 bg-white rounded-full shadow-md transition-all ${isInWishlist ? 'text-[#B88E2F]' : 'text-gray-300 hover:text-[#B88E2F]'}`}
                >
                  <svg
                    className="w-6 h-6"
                    fill={isInWishlist ? 'currentColor' : 'none'}
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

                <div className={`h-full flex ${viewMode === 'list' ? 'flex-row w-full' : 'flex-col'} rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md md:p-6`}>
                  <div className={`relative mb-4 ${viewMode === 'list' ? 'w-1/3 aspect-square' : 'aspect-square'} overflow-hidden`}>
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes={viewMode === 'list' ? "33vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                    />
                  </div>

                  <div className={`flex flex-col flex-1 ${viewMode === 'list' ? 'w-2/3 pl-4' : ''}`}>
                    <div className={viewMode === 'list' ? 'text-left' : 'text-center'}>
                      <p className="mb-1 text-sm text-gray-500">{product.category}</p>
                      <p className="mb-2 line-clamp-2 text-base font-medium text-gray-800 md:text-lg min-h-[3rem]">
                        {product.name}
                      </p>
                      <div className={`mb-2 text-sm text-gray-600 ${viewMode === 'list' ? 'line-clamp-5' : 'line-clamp-3'} min-h-[4.5rem]`}>
                        {product.description}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className={`flex flex-col ${viewMode === 'list' ? 'items-start' : 'items-center'} gap-1`}>
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

                      <div className="mt-2 flex items-center gap-2">
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
      </section>

      {/* Pagination */}
      <section className="px-4 py-8 md:px-8 lg:px-16">
        <div className="flex justify-center">
          <nav className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-8 items-center justify-center gap-1 rounded-md border-2 border-[#FFF9E5] bg-[#FFF9E5] px-3 text-sm text-gray-600 transition-colors duration-200 hover:bg-[#FBEBB5] focus:outline-none focus:ring-2 focus:ring-[#B88E2F] md:h-10 md:px-4 md:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex h-8 w-8 items-center justify-center rounded-md border-2 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#B88E2F] md:h-10 md:w-10 md:text-base ${
                  page === currentPage
                    ? 'border-[#B88E2F] bg-[#FBEBB5] text-gray-800'
                    : 'border-[#FFF9E5] bg-[#FFF9E5] text-gray-600 hover:bg-[#FBEBB5]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-8 items-center justify-center gap-1 rounded-md border-2 border-[#FFF9E5] bg-[#FFF9E5] px-3 text-sm text-gray-600 transition-colors duration-200 hover:bg-[#FBEBB5] focus:outline-none focus:ring-2 focus:ring-[#B88E2F] md:h-10 md:px-4 md:text-base"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </nav>
        </div>
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
