'use client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import profilePic from '@/public/main-image.jpg';
import Link from 'next/link';
import NavBar from '../components/NavBar'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation';
export default function Home() {
  const userToolKit = useSelector((state) => state.user);
  const router =useRouter();

const products=()=>{
  router.push('/categories')
}
  return (
    <>
        <NavBar/>
      <div className="w-full h-screen hidden md:block">
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
        <div className="absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <div className='w-full flex justify-center items-center mb-2'>
        <Image
        className='rounded-full mx-4 z-30 text-center'
        src="/logo.png" // Path to the image in the public folder
        alt="logo Image"
        width={150} // Specify the width of the image
        height={150} // Specify the height of the image
        />
        </div>
          <h1 className="text-6xl mb-12 text-shadow-lg">تميز بلوحة مفاتيح خاصة بك</h1>
          <div className='flex flex-col justify-center items-center gap-2'>
          <button className="bg-[#004226] text-white rounded-full border-none py-4 px-8 cursor-pointer text-4xl hover:shadow-lg hover:shadow-[#004226] hover:-translate-y-2 transition duration-300 ease-in-out">
            ابدأ التصميم
          </button>
          <button onClick={products} className="text-[#004226] bg-white rounded-full border-none py-4 px-8 cursor-pointer text-4xl hover:shadow-lg hover:shadow-[#004226] hover:-translate-y-2 transition duration-300 ease-in-out">
            المنتجات
          </button>
          </div>
        </div>
      </div>
      
      <div className='relative w-full h-screen block md:hidden'>
        {/* Background Image */}
        <div className='w-full flex justify-center items-center mb-2 mt-4 pt-4'>
        <Image
        className='rounded-full mx-4 z-30 text-center'
        src="/logo.png" // Path to the image in the public folder
        alt="logo Image"
        width={150} // Specify the width of the image
        height={150} // Specify the height of the image
        />
        </div>
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
          <div className='flex flex-col justify-center items-center gap-2'>
          <button className="bg-[#004226] text-white rounded-full border-none  py-4 px-8 cursor-pointer text-2xl hover:shadow-lg hover:shadow-[#004226] hover:-translate-y-2 transition duration-300 ease-in-out">
            ابدأ التصميم
          </button>
          <button onClick={products} className="text-[#004226] bg-white rounded-full border-none  py-4 px-8 cursor-pointer text-2xl hover:shadow-lg hover:shadow-[#004226] hover:-translate-y-2 transition duration-300 ease-in-out">
            المنتجات
          </button>
          </div>
        </div>
      </div>
    </>
  );
}
