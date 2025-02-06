import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-white text-black py-8">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Quick Links Section */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-black transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="text-gray-600 hover:text-black transition-colors">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-600 hover:text-black transition-colors">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section with Address */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="font-semibold text-lg mb-4">Contact</h3>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p>
                                400 University Drive Suite 200 Coral<br />
                                Gables,<br />
                                FL 33134 USA
                            </p>
                            <p>Email: info@company.com</p>
                            <p>Phone: +123 456 789</p>
                        </div>
                    </div>

                    {/* Social Links Section */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                        <div className="flex flex-col space-y-3">
                            <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                                Facebook
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                                Twitter
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                                Instagram
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-xs text-gray-600 mt-2">
                            Get updates about new products and special offers
                        </p>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600">
                        © 2025 Ahsan Paracha. All rights reserved.<br />
                        <span className="block mt-1 text-xs">
                            400 University Drive Suite 200 Coral Gables, FL 33134 USA
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    )
}