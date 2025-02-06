// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "../context/CartContext";
import { CartSlider } from "./components/CartSlider";
import { WishlistProvider } from "../context/WishlistContext";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Website",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: "#B88E2F"
        }
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            <WishlistProvider>
              <Header />
              {children}
              <CartSlider />
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}