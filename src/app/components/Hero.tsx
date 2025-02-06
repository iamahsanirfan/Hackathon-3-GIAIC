// app/components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative bg-[#FBEBB5] min-h-screen flex items-center overflow-hidden">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:order-first order-last w-full md:w-1/2 lg:w-2/5 flex flex-col items-start">
                        <h1 className="font-poppins font-medium text-4xl sm:text-5xl md:text-6xl leading-tight md:leading-[1.1] tracking-tight">
                            Rocket Single Seater
                        </h1>

                        <div className="mt-6 sm:mt-8 group">
                            <Link
                                href="/rocket-seater"
                                className="inline-flex items-center gap-2 font-poppins font-medium text-lg sm:text-xl md:text-2xl hover:underline transition-all"
                                aria-label="Shop Now"
                            >
                                Shop Now
                                <span className="group-hover:translate-x-2 transition-transform">
                                    →
                                </span>
                            </Link>
                            <div className="w-32 h-0.5 bg-black mt-2 group-hover:w-40 transition-all" />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-3/5 relative aspect-square md:aspect-[853/1000]">
                        <div className="relative w-full h-full overflow-hidden">
                            <Image
                                src="/seat.png"
                                alt="Premium Single Seater Chair"
                                fill
                                priority
                                quality={90}
                                className="object-contain object-right"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;