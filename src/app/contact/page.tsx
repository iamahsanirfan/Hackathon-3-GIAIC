'use client'
import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!name || !email || !subject || !message) {
            toast.error('Please fill all required fields')
            return
        }

        // Add your form submission logic here
        toast.success('Submitted successfully!')
        
        // Reset form
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
    }

    return (
        <main>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

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
                    <h1 className="font-poppins text-3xl font-medium md:text-4xl lg:text-[48px]">Contact</h1>

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
                        <p className="font-poppins font-normal text-[16px] text-black transition-colors group-hover:text-black">
                            Contact
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Contact Detail */}
                <div className="text-center mb-16">
                    <h1 className="font-poppins font-semibold text-[36px] mb-4">Get In Touch With Us</h1>
                    <p className="font-poppins font-normal text-[16px] text-[#9F9F9F] mx-auto max-w-2xl">
                        For More Information About Our Product & Services. Please Feel Free To Drop Us <br />
                        An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                    </p>
                </div>

                {/* Detail divs */}
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-12 justify-center">
                    {/* left side company details */}
                    <div className="flex-1 max-w-[393px] min-w-[300px] space-y-8">
                        {/* Location */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/location.png"
                                    alt="Location"
                                    width={30}
                                    height={30}
                                />
                                <p className="font-poppins font-medium text-[24px]">Address</p>
                            </div>
                            <p className="font-poppins font-normal text-[16px] pl-[42px]">
                                236 5th SE Avenue, New <br /> York NY10000, United <br /> States
                            </p>
                        </div>

                        {/* Phone */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/phone.png"
                                    alt="Phone"
                                    width={30}
                                    height={30}
                                />
                                <p className="font-poppins font-medium text-[24px]">Phone</p>
                            </div>
                            <p className="font-poppins font-normal text-[16px] pl-[42px]">
                                Mobile: +(84) 546-6789 <br /> Hotline: +(84) 456-6789
                            </p>
                        </div>

                        {/* Working time */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/clock.png"
                                    alt="Clock"
                                    width={23}
                                    height={23}
                                />
                                <p className="font-poppins font-medium text-[24px]">Working Time</p>
                            </div>
                            <p className="font-poppins font-normal text-[16px] pl-[42px]">
                                Monday-Friday: 9:00 - <br /> 22:00 <br />
                                Saturday-Sunday: 9:00 - <br /> 21:00
                            </p>
                        </div>
                    </div>

                    {/* right side form */}
                    <div className="flex-1 max-w-[635px] min-w-[300px] space-y-6">
                        <div className="space-y-4">
                            <p className="font-poppins font-medium text-[16px]">Name *</p>
                            <input 
                                className="w-full h-[75px] rounded-[10px] border-2 border-[#9F9F9F] px-4"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <p className="font-poppins font-medium text-[16px]">Email address *</p>
                            <input 
                                className="w-full h-[75px] rounded-[10px] border-2 border-[#9F9F9F] px-4"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <p className="font-poppins font-medium text-[16px]">Subject *</p>
                            <input 
                                className="w-full h-[75px] rounded-[10px] border-2 border-[#9F9F9F] px-4"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <p className="font-poppins font-medium text-[16px]">Message *</p>
                            <textarea 
                                className="w-full h-[120px] rounded-[10px] border-2 border-[#9F9F9F] px-4 py-2"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full max-w-[222px] py-3 md:py-4 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-colors text-sm md:text-base"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {/* Policy Section */}
            <div className="bg-[#FAF4F4] px-4 py-12 md:py-24">
                <div className="mx-auto grid max-w-screen-xl gap-8 md:grid-cols-3">
                    {policyItems.map((item, index) => (
                        <div key={index} className="text-center">
                            <h2 className="font-poppins text-2xl font-medium md:text-3xl">
                                {item.title}
                            </h2>
                            <p className="font-poppins mx-auto mt-2 max-w-md text-base text-gray-600 md:text-lg">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
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