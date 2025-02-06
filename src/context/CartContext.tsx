// context/CartContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface CartItem {
  productId: string
  quantity: number
  price: number
}

interface CartContextType {
  cartItems: CartItem[]
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (productId: string, quantity: number, price: number) => void
  updateQuantity: (productId: string, newQuantity: number) => void
  removeFromCart: (productId: string) => void
  getSubtotal: () => number
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const findItemIndex = (productId: string) => 
    cartItems.findIndex(item => item.productId === productId)

  const addToCart = (productId: string, quantity: number, price: number) => {
    setCartItems(prev => {
      const index = findItemIndex(productId)
      if (index > -1) {
        const updated = [...prev]
        updated[index].quantity += quantity
        return updated
      }
      return [...prev, { productId, quantity, price }]
    })
    openCart()
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return removeFromCart(productId)
    
    setCartItems(prev => {
      const index = findItemIndex(productId)
      if (index === -1) return prev
      
      const updated = [...prev]
      updated[index].quantity = newQuantity
      return updated
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId))
  }

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0)
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      getSubtotal,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)