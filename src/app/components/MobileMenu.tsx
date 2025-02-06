// components/MobileMenu.tsx
"use client";
import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    links: Array<{ href: string; label: string }>;
}

const MobileMenu = ({ isOpen, onClose, links }: MobileMenuProps) => {
    // Prevent background scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <div 
            className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={onClose}
        >
            <div 
                className={`absolute top-0 left-0 right-0 bg-white shadow-xl rounded-b-2xl transform transition-transform duration-300 ${
                    isOpen ? "translate-y-0" : "-translate-y-full"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Menu Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Navigation</h3>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Menu Items */}
                <nav className="p-4">
                    <ul className="space-y-3">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className="block px-4 py-3 text-lg text-gray-700 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Additional Menu Footer */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex justify-between text-gray-500 text-sm">
                        <span>© 2023 Your Brand</span>
                        <span>v1.0.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;