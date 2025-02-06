// components/Header.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';
import MobileMenu from "./MobileMenu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

type IconLink = 
  | { 
      type: 'link';
      src: string;
      alt: string;
      href: string;
    }
  | {
      type: 'button';
      src: string;
      alt: string;
      action: () => void;
    };

const Header = () => {
    const router = useRouter();
    const { openCart, cartItems } = useCart();
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/blog", label: "Blogs" },
        { href: "/contact", label: "Contact" },
    ];

    const iconLinks: IconLink[] = [
        { type: 'button', src: "/search.png", alt: "Search", action: () => setIsSearchOpen(true) },
        { type: 'link', src: "/heart.png", alt: "Wishlist", href: "/wishlist" },
        { type: 'button', src: "/cart.png", alt: "Cart", action: openCart },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <header className={`sticky top-0 z-50 h-16 md:h-20 backdrop-blur-md shadow-sm transform transition-all duration-300 ${
            isHidden ? "-translate-y-full" : "translate-y-0"
        } ${isHomePage ? "bg-[#FBEBB5]/95" : "bg-white"}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full gap-x-8">
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 text-gray-900"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-x-8 flex-1">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className={`font-medium relative group ${isHomePage ? "text-gray-900 hover:text-teal-700" : "text-gray-700 hover:text-blue-600"}`}>
                                    {link.label}
                                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isHomePage ? "bg-teal-700" : "bg-blue-600"}`} />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Search Bar */}
                    {isSearchOpen && (
                        <div className={`absolute inset-0 ${isHomePage ? 'bg-[#FBEBB5]' : 'bg-white'} flex items-center px-4 md:relative md:inset-auto`}>
                            <form onSubmit={handleSearch} className="flex-1 flex gap-4">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="text-gray-600 hover:text-gray-800 px-4"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Header Icons */}
                    {!isSearchOpen && (
                        <div className="flex items-center gap-x-6">
                            {/* Other Icons */}
                            <ul className="flex items-center gap-x-6">
                                {iconLinks.map((icon) => (
                                    <li key={icon.alt}>
                                        {icon.type === 'link' ? (
                                            <Link href={icon.href} className="p-2 relative group" aria-label={icon.alt}>
                                                <div className="relative w-6 h-6 transform transition-all duration-300 group-hover:scale-110">
                                                    <Image src={icon.src} alt={icon.alt} fill className="object-contain" sizes="28px" />
                                                </div>
                                            </Link>
                                        ) : (
                                            <button 
                                                onClick={icon.action} 
                                                className="p-2 relative group" 
                                                aria-label={icon.alt}
                                            >
                                                <div className="relative w-6 h-6 transform transition-all duration-300 group-hover:scale-110">
                                                    <Image src={icon.src} alt={icon.alt} fill className="object-contain" sizes="28px" />
                                                </div>
                                                {icon.alt === "Cart" && (
                                                    <span className={`absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center ${isHomePage ? "bg-teal-700" : "bg-blue-600"}`}>
                                                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                                    </span>
                                                )}
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Account Icon - Far Right with Separator */}
                            <div className="h-full flex items-center border-l border-black pl-6 ml-2">
                                <SignedOut>
                                    <button 
                                        className="p-2 relative group" 
                                        aria-label="Account"
                                    >
                                        <SignInButton>
                                            <div className="relative w-7 h-7 transform transition-all duration-300 group-hover:scale-110">
                                                <Image 
                                                    src="/account.png" 
                                                    alt="Account" 
                                                    fill 
                                                    className="object-contain" 
                                                    sizes="32px" 
                                                />
                                            </div>
                                        </SignInButton>
                                    </button>
                                </SignedOut>
                                <SignedIn>
                                    <div className="p-2 relative group">
                                        <UserButton 
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-7 h-7",
                                                    userButtonPopoverCard: "shadow-lg rounded-lg"
                                                }
                                            }}
                                        />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={navLinks} />
            </nav>
        </header>
    );
};

export default Header;