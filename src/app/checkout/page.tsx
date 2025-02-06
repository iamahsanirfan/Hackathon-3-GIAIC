// app/checkout/page.tsx
'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import Image from "next/image"
import Link from "next/link"

const countries = ["Pakistan", "India", "USA", "UK", "Canada"]

const CheckoutPage = () => {
  const router = useRouter()
  const { cartItems, getSubtotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    phone: '',
    email: '',
    notes: '',
    paymentMethod: 'cod',
    agreement: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cartItems.length === 0 || !formData.agreement) return
    handlePlaceOrder()
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push('/orderplaced')
      clearCart()
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="overflow-x-hidden">
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
          <h1 className="font-poppins text-3xl font-medium md:text-4xl lg:text-[48px]">Checkout</h1>

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
              Checkout
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row justify-center bg-white p-4 sm:p-6 md:p-8 font-poppins gap-6 md:gap-8">
        {/* Billing Details Section */}
        <div className="w-full lg:w-[55%] xl:w-[608px] space-y-4 md:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-[36px] font-semibold">Billing details</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full space-y-2">
              <label className="text-sm sm:text-[16px] font-medium">First Name *</label>
              <input 
                className="h-[60px] md:h-[75px] w-full rounded-[10px] border-2 border-[#9F9F9F] px-4 text-sm sm:text-base" 
                type="text" 
                name="firstName"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full space-y-2">
              <label className="text-sm sm:text-[16px] font-medium">Last Name *</label>
              <input 
                className="h-[60px] md:h-[75px] w-full rounded-[10px] border-2 border-[#9F9F9F] px-4 text-sm sm:text-base" 
                type="text" 
                name="lastName"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            {[
              { label: 'Company Name (Optional)', name: 'company', type: 'text' },
              { label: 'Country / Region', name: 'country', type: 'select' },
              { label: 'Street address', name: 'address', type: 'text' },
              { label: 'Town / City', name: 'city', type: 'text' },
              { label: 'Province', name: 'province', type: 'text' },
              { label: 'Zip code', name: 'zipCode', type: 'text' },
              { label: 'Phone', name: 'phone', type: 'tel' },
              { label: 'Email address', name: 'email', type: 'email' },
              { label: 'Additional information', name: 'notes', type: 'text' },
            ].map((field, index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm sm:text-[16px] font-medium">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    className="h-[60px] md:h-[75px] w-full rounded-[10px] border-2 border-[#9F9F9F] px-4 bg-white text-sm sm:text-base"
                    name={field.name}
                    required
                    onChange={handleInputChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="h-[60px] md:h-[75px] w-full rounded-[10px] border-2 border-[#9F9F9F] px-4 text-sm sm:text-base"
                    type={field.type}
                    name={field.name}
                    required={!field.label.includes('Optional')}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-[45%] xl:w-[608px] space-y-4 md:space-y-6">
          <div className="flex justify-between">
            <p className="text-xl sm:text-2xl md:text-[24px] font-medium">Product</p>
            <p className="text-xl sm:text-2xl md:text-[24px] font-medium">Subtotal</p>
          </div>

          <div className="space-y-3 md:space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <div className="text-sm sm:text-[16px] font-normal text-[#9F9F9F]">
                  Product {item.productId} <span className="text-xs">(x{item.quantity})</span>
                </div>
                <p className="text-sm sm:text-[16px] font-light">
                  Rs {(item.quantity * item.price).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>

          <hr className="border-2 border-[#D9D9D9]" />

          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between">
              <p className="text-sm sm:text-[16px] font-normal">Subtotal</p>
              <p className="text-sm sm:text-[16px] font-light">
                Rs {getSubtotal().toLocaleString('en-IN')}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm sm:text-[16px] font-normal">Shipping</p>
              <p className="text-sm sm:text-[16px] font-light">Free</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm sm:text-[16px] font-normal">Total</p>
              <p className="text-xl sm:text-2xl md:text-[24px] font-bold text-[#B88E2F]">
                Rs {getSubtotal().toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <hr className="border-2 border-[#D9D9D9]" />

          {/* Payment Methods */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg sm:text-xl md:text-[20px] font-medium">Payment Methods</h3>
            <div className="space-y-3 md:space-y-4">
              {[
                {
                  id: 'cod',
                  label: 'Cash on Delivery',
                  icon: '/cash.png',
                  description: 'Pay with cash upon delivery'
                },
                {
                  id: 'credit-card',
                  label: 'Credit/Debit Card',
                  icon: '/credit-card.png',
                  description: 'Secure online payment'
                },
              ].map((method) => (
                <div key={method.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <input 
                    type="radio" 
                    id={method.id}
                    name="paymentMethod" 
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={handleInputChange}
                    className="h-4 w-4 sm:h-5 sm:w-5" 
                  />
                  <Image
                    src={method.icon}
                    alt={method.label}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <div className="flex-1">
                    <label htmlFor={method.id} className="text-sm sm:text-[16px] font-medium block">
                      {method.label}
                    </label>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Details for Credit Card */}
            {formData.paymentMethod === 'credit-card' && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card Number *</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full h-[50px] rounded-lg border-2 border-[#9F9F9F] px-4"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date *</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full h-[50px] rounded-lg border-2 border-[#9F9F9F] px-4"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVC *</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full h-[50px] rounded-lg border-2 border-[#9F9F9F] px-4"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 mt-4">
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              checked={formData.agreement}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4"
              required
            />
            <label htmlFor="agreement" className="text-sm text-gray-600">
              I have read and agree to the website{' '}
              <a href="/terms" className="text-[#B88E2F] hover:underline">terms and conditions</a>{' '}
              and{' '}
              <a href="/privacy" className="text-[#B88E2F] hover:underline">privacy policy</a> *
            </label>
          </div>

          {/* Place Order Button */}
          <div className="flex justify-center">
            <button 
              type="submit"
              disabled={isLoading || cartItems.length === 0 || !formData.agreement}
              className={`h-[50px] sm:h-[64px] w-full sm:w-[215px] rounded-[12px] sm:rounded-[15px] border-2 border-black text-sm sm:text-base transition-all ${
                isLoading || cartItems.length === 0 || !formData.agreement
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'hover:bg-black hover:text-white'
              }`}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>

      {/* Policy Section */}
      <div className="bg-[#FAF4F4] px-4 sm:px-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid max-w-screen-xl gap-8 grid-cols-1 md:grid-cols-3">
          {[
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
          ].map((item, index) => (
            <div key={index} className="text-center p-4">
              <h2 className="font-poppins text-xl md:text-2xl lg:text-3xl font-medium">
                {item.title}
              </h2>
              <p className="font-poppins mx-auto mt-2 text-sm md:text-base text-gray-600 max-w-xs md:max-w-md">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default CheckoutPage