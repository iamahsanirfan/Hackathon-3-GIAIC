import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "../context/CartContext";
import { CartSlider } from "./components/CartSlider";
import { WishlistProvider } from "src/context/WishlistContext"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

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
      <html lang="en">
      <body>
        <CartProvider>
        <WishlistProvider>
        <ClerkProvider>
          <Header />
          {children}
          <CartSlider />
          <Footer />
        </ClerkProvider>
        </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
