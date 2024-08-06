'use client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import profilePic from '@/public/main-image.jpg';
import Link from 'next/link';
import NavBar from '../components/NavBar'
export default function Home() {
  return (
    <>
        <NavBar/>
     {/* <div className='md:hidden z-20'>
          <Headers />
        </div> */}
      <div className="w-full h-screen hidden md:block">
        {/* Navigation Bar */}
        {/* <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-10 bg-black bg-opacity-0 text-white z-10">
          <div className="text-xl font-bold">MyLogo</div>
          <div className="flex space-x-4 gap-12">
            <Link href="#link1" className="text-white no-underline text-2xl hover:text-shadow-white transition duration-500 ease-in-out">المنتجات</Link>
            <Link href="#link2" className="text-white no-underline text-2xl hover:text-shadow-white transition duration-500 ease-in-out">العالمية</Link>
            <Link href="#link3" className="text-white no-underline text-2xl hover:text-shadow-white transition duration-500 ease-in-out">حول الشركة</Link>
            <Link href="#link4" className="text-white no-underline text-2xl hover:text-shadow-white transition duration-500 ease-in-out">حسابك</Link>
          </div>
          <button className="bg-[#004226] text-white rounded-full border-none py-2 px-8 cursor-pointer text-2xl hover:shadow-lg hover:shadow-[#004226] transition duration-300 ease-in-out">
            سجل الدخول
          </button>
        </nav> */}

        {/* Background Image */}
        <Image
          src={profilePic}
          alt="Picture of the author"
          layout="fill"
          quality={100}
          sizes="100vw"
          placeholder="blur"
          className="object-cover absolute"
        />

        {/* Centered Content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-6xl mb-12 text-shadow-lg">تميز بلوحة مفاتيح خاصة بك</h1>
          <button className="bg-[#004226] text-white rounded-full border-none mb-24 py-4 px-8 cursor-pointer text-4xl hover:shadow-lg hover:shadow-[#004226] hover:-translate-y-2 transition duration-300 ease-in-out">
            ابدأ التصميم
          </button>
        </div>
      </div>
      
      <div className='relative w-full h-screen block md:hidden'>
        {/* Background Image */}
        <div className="text-xl font-bold absolute top-10 left-10 z-20">MyLogo</div>
        <Image
          src={profilePic}
          alt="Picture of the author"
          layout="fill"
          quality={100}
          sizes="100vw"
          placeholder="blur"
          className="object-cover absolute z-10"
        />

        {/* Mobile Centered Content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-20">
          <h1 className="text-4xl mb-12 text-shadow-lg">تميز بلوحة مفاتيح خاصة بك</h1>
          <button className="bg-[#004226] text-white rounded-full border-none mb-24 py-4 px-8 cursor-pointer text-2xl hover:shadow-lg hover:shadow-[#004226] hover:-translate-y-2 transition duration-300 ease-in-out">
            ابدأ التصميم
          </button>
        </div>
      </div>
    </>
  );
}
