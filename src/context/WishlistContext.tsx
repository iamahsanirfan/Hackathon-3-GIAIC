'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('wishlist')
    if (saved) setWishlist(JSON.parse(saved))
  }, [])

  const updateStorage = (items: string[]) => {
    localStorage.setItem('wishlist', JSON.stringify(items))
  }

  const addToWishlist = (productId: string) => {
    setWishlist(prev => {
      const updated = [...prev, productId]
      updateStorage(updated)
      return updated
    })
  }

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => {
      const updated = prev.filter(id => id !== productId)
      updateStorage(updated)
      return updated
    })
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}