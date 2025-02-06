// components/CartSlider.tsx
'use client'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

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
  image: {
    asset: {
      _ref: string
    }
  }
}

export const CartSlider = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getSubtotal
  } = useCart()

  const [products, setProducts] = useState<SanityProduct[]>([])

  useEffect(() => {
    const fetchCartProducts = async () => {
      const productIds = cartItems.map(item => item.productId)
      if (productIds.length === 0) return

      const query = `*[_type == "product" && _id in $productIds] {
        _id,
        name,
        image
      }`

      const data = await sanity.fetch<SanityProduct[]>(query, { productIds })
      setProducts(data)
    }

    fetchCartProducts()
  }, [cartItems])

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isCartOpen ? 'visible bg-black/20' : 'invisible bg-transparent'
      }`}
      onClick={closeCart}
    >
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-[417px] transform bg-white p-4 shadow-xl transition-transform duration-300 md:p-6 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between md:mb-6">
            <h2 className="text-xl font-semibold md:text-2xl">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="rounded p-1 hover:bg-gray-100 md:p-2"
            >
              <span className="text-2xl md:text-3xl">×</span>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="px-2 text-gray-500 md:px-4">Your cart is empty</p>
            ) : (
              cartItems.map((item) => {
                const product = products.find(p => p._id === item.productId)
                if (!product) return null

                const imageUrl = builder.image(product.image).url()

                return (
                  <div
                    key={product._id}
                    className="mb-3 flex gap-3 border-b pb-3 md:mb-4 md:gap-4 md:pb-4"
                  >
                    <div className="h-16 w-16 flex-shrink-0 bg-[#FBEBB5] md:h-24 md:w-24">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-contain p-1 md:p-2"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="text-sm font-medium line-clamp-2 md:text-base">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-600 md:text-sm">
                        Rs {item.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(product._id, item.quantity - 1)
                          }
                          className="h-6 w-6 rounded border text-sm hover:bg-gray-100 md:h-8 md:w-8 md:text-base"
                        >
                          -
                        </button>
                        <span className="text-sm md:text-base">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(product._id, item.quantity + 1)
                          }
                          className="h-6 w-6 rounded border text-sm hover:bg-gray-100 md:h-8 md:w-8 md:text-base"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="mt-1 text-xs text-red-500 hover:text-red-700 md:mt-2 md:text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer */}
          <div className="border-t pt-3 md:pt-4">
            <div className="mb-3 flex justify-between md:mb-4">
              <span className="text-sm font-normal md:text-base">Subtotal:</span>
              <span className="text-sm font-semibold text-[#B88E2F] md:text-base">
                Rs {getSubtotal().toFixed(2)}
              </span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full rounded-[50px] border-2 px-3 py-2 text-center text-sm transition-colors hover:bg-black hover:text-white md:px-4 md:py-3 md:text-base"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}