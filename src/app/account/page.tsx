'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

export default function Account() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [regEmailError, setRegEmailError] = useState('');

  const validateEmail = (email: string, isRegistration: boolean = false) => {
    if (!email.includes('@gmail.com')) {
      isRegistration 
        ? setRegEmailError('Please use a valid @gmail.com address')
        : setEmailError('Please use a valid @gmail.com address');
    } else {
      isRegistration ? setRegEmailError('') : setEmailError('');
    }
  };

  return (
    <main className="overflow-x-hidden">
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
            My Account
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
              My account
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 px-4 sm:px-6 md:px-8 py-8 md:py-12 justify-center">
        {/* Log In Section */}
        <div className="w-full md:flex-1 space-y-6 md:space-y-8 max-w-[426px]">
          <h1 className="font-poppins text-2xl md:text-3xl lg:text-[36px] font-semibold">Log In</h1>
          
          <div className="space-y-4 md:space-y-6">
            <div>
              <p className="font-poppins text-sm md:text-[16px] font-medium mb-2">Username or email address</p>
              <input
                className="w-full h-[60px] md:h-[75px] rounded-[10px] border-2 border-[#9F9F9F] px-4 text-sm md:text-base focus:outline-none focus:border-black"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
              {emailError && <p className="text-red-500 text-xs md:text-sm mt-1">{emailError}</p>}
            </div>

            <div>
              <p className="font-poppins text-sm md:text-[16px] font-medium mb-2">Password</p>
              <div className="relative">
                <input
                  className="w-full h-[60px] md:h-[75px] rounded-[10px] border-2 border-[#9F9F9F] px-4 pr-12 text-sm md:text-base focus:outline-none focus:border-black"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center gap-2 text-gray-600 text-xs md:text-sm"
                  >
                    {showPassword ? 'Hide' : 'Show'} Password
                    {showPassword ? (
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M6.585 6.585a4 4 0 005.656 5.656m-6.363-9.192a10.05 10.05 0 016.363-2.922c4.478 0 8.268 2.943 9.543 7a10.048 10.048 0 01-2.649 5.877m-12.703.071a4 4 0 01-.071-5.648" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
              <div className="w-6 h-6 md:w-[30px] md:h-[27px] rounded-[5px] border-2 border-[#9F9F9F] flex items-center justify-center">
                {rememberMe && (
                  <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p className="font-poppins text-sm md:text-[16px] font-normal">Remember me</p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <button className="w-full md:w-[215px] h-[50px] md:h-[64px] rounded-[12px] md:rounded-[15px] border-2 border-black text-sm md:text-base hover:bg-black hover:text-white transition-all">
                Log In
              </button>
              <p className="font-poppins text-sm md:text-[16px] font-light hover:underline cursor-pointer text-center md:text-left">
                Lost Your Password?
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[2px] bg-[#9F9F9F] my-8" />
        <div className="block md:hidden w-full h-[2px] bg-[#9F9F9F]" />

        {/* Register Section */}
        <div className="w-full md:flex-1 space-y-6 md:space-y-8 max-w-[426px]">
          <h1 className="font-poppins text-2xl md:text-3xl lg:text-[36px] font-semibold">Register</h1>
          
          <div className="space-y-4 md:space-y-6">
            <div>
              <p className="font-poppins text-sm md:text-[16px] font-medium mb-2">Email address</p>
              <input
                className="w-full h-[60px] md:h-[75px] rounded-[10px] border-2 border-[#9F9F9F] px-4 text-sm md:text-base focus:outline-none focus:border-black"
                type="email"
                value={regEmail}
                onChange={(e) => {
                  setRegEmail(e.target.value);
                  validateEmail(e.target.value, true);
                }}
              />
              {regEmailError && <p className="text-red-500 text-xs md:text-sm mt-1">{regEmailError}</p>}
            </div>

            <div className="space-y-3 md:space-y-4">
              <p className="font-poppins text-sm md:text-[16px] font-light leading-relaxed">
                A link to set a new password will be sent to your email address.
              </p>
              <p className="font-poppins text-sm md:text-[16px] font-light leading-relaxed">
                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
                <span className="font-poppins font-semibold cursor-pointer hover:underline">
                  privacy policy.
                </span>
              </p>
            </div>

            <button className="w-full md:w-[215px] h-[50px] md:h-[64px] rounded-[12px] md:rounded-[15px] border-2 border-black text-sm md:text-base hover:bg-black hover:text-white transition-all">
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Policy Section */}
      <div className="bg-[#FAF4F4] px-4 sm:px-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto grid max-w-screen-xl gap-8 grid-cols-1 md:grid-cols-3">
          {policyItems.map((item, index) => (
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
  );
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
];