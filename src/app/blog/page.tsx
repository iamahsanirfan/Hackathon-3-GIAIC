import Image from "next/image"
import Link from "next/link"

export default function Blog() {
  return (
    <main className="overflow-hidden">
       {/* Hero Section */}
       <div className="relative h-[200px] sm:h-[250px] md:h-[316px] w-full">
        <Image
          fill
          className="object-cover"
          src="/shop1.png"
          alt="Dining Table"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-4 text-center px-4">
          <Image
            width={77}
            height={77}
            src="/logo1.png"
            alt="Logo"
            className="w-12 md:w-16 lg:w-20"
          />
          <h1 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-medium">
            Blog
          </h1>

          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-1 sm:gap-2 group">
              <p className="font-poppins text-sm sm:text-[16px] font-normal text-black">
                Home
              </p>
              <Image
                width={20}
                height={20}
                src="/arrow.png"
                alt="Arrow"
                className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="font-poppins text-sm sm:text-[16px] font-normal text-black ml-2">
              Blog
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-8 lg:flex-nowrap">
            {/* Left Side - Blog Posts */}
            <div className="w-full lg:w-2/3">
              {[1, 2, 3].map((post) => (
                <article key={post} className="mb-16 space-y-6">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      width={817}
                      height={500}
                      src={`/blog${post}.png`}
                      alt={`Blog ${post}`}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#9F9F9F]">
                    <div className="flex items-center gap-2">
                      <Image src="/admin.png" alt="Admin" width={20} height={20} />
                      <span>Admin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/calender.png" alt="Date" width={20} height={20} />
                      <span>11 December 2006</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/tag.png" alt="Tag" width={20} height={20} />
                      <span>{post === 2 ? 'Wood' : 'Handmade'}</span>
                    </div>
                  </div>

                  <h2 className="font-poppins text-2xl font-medium md:text-3xl">
                    {post === 1 && 'Going all-in with millennial design'}
                    {post === 2 && 'Handmade pieces that took time to make'}
                    {post === 3 && 'Exploring new ways of decorating'}
                  </h2>

                  <p className="font-poppins text-[#9F9F9F] leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua...
                  </p>

                  <button className="group relative font-poppins font-medium">
                    <span className="mr-2">Read more</span>
                    <hr className="absolute bottom-0 w-[77px] border-2 border-black transition-all group-hover:w-full" />
                  </button>
                </article>
              ))}

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border-2 text-sm transition-colors ${
                        page === 1
                          ? 'border-[#B88E2F] bg-[#FBEBB5]'
                          : 'border-[#FFF9E5] hover:bg-[#FBEBB5]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="flex h-10 items-center gap-1 rounded-md border-2 border-[#FFF9E5] px-4 transition-colors hover:bg-[#FBEBB5]">
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>

            {/* Right Side - Sidebar */}
            <aside className="w-full space-y-8 lg:w-1/3 lg:pl-8">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-lg border-2 border-[#9F9F9F] px-4 py-3 font-poppins"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Image src="/search.png" alt="Search" width={20} height={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-poppins text-xl font-medium mb-4">Categories</h3>
                <ul className="space-y-3">
                  {['Furniture', 'Design', 'Wood', 'Handmade'].map((category) => (
                    <li
                      key={category}
                      className="flex items-center justify-between border-b py-2 hover:bg-gray-50"
                    >
                      <span className="text-[#9F9F9F]">{category}</span>
                      <span className="text-[#9F9F9F]">(12)</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-poppins text-xl font-medium mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((post) => (
                    <div key={post} className="flex items-center gap-4">
                      <Image
                        src={`/blog${post}.png`}
                        alt={`Post ${post}`}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-poppins font-medium">Post Title {post}</h4>
                        <p className="text-sm text-[#9F9F9F]">March 12, 2023</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Policy Section */}
      <section className="bg-[#FAF4F4] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {policyItems.map((item, index) => (
              <div key={index} className="text-center">
                <h3 className="font-poppins text-2xl font-medium">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

const policyItems = [
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
]