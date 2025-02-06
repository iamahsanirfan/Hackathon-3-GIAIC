'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useCart } from "@/context/CartContext"

export default function OrderPlacedPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
    // We only want to clear the cart once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-[#FAF4F4] pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12 flex justify-center">
          <div className="w-24 h-24 bg-lime-600 rounded-full flex items-center justify-center">
            <Image 
              src="/checkmark.png" 
              alt="Order Confirmed" 
              width={48} 
              height={48}
              className="text-white"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </p>

        <div className="bg-white rounded-xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-semibold mb-6">What&apos;s Next?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-4">
              <div className="text-4xl text-[#B88E2F] mb-4">1</div>
              <h3 className="font-medium mb-2">Order Processing</h3>
              <p className="text-gray-600">
                We&apos;re preparing your items for shipment
              </p>
            </div>
            <div className="p-4">
              <div className="text-4xl text-[#B88E2F] mb-4">2</div>
              <h3 className="font-medium mb-2">Quality Check</h3>
              <p className="text-gray-600">
                Ensuring your items meet our standards
              </p>
            </div>
            <div className="p-4">
              <div className="text-4xl text-[#B88E2F] mb-4">3</div>
              <h3 className="font-medium mb-2">Shipping</h3>
              <p className="text-gray-600">
                Your order will be dispatched soon
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/shop"
          className="inline-block bg-[#B88E2F] text-white px-8 py-3 rounded-full hover:bg-[#9a7727] transition-colors text-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  )
}
