'use client'
import React, { useEffect } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button,Avatar} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo.jsx";
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import Cookies from 'js-cookie';
import Image from 'next/image';

export default function App() {
  const userToolKit = useSelector((state) => state.user)
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user,setUser]=React.useState(null);
const profile=()=>{
  router.push('/profile')
}
  const menuItems = [
    {name:"العالمية",
    href:'/rank'
    },
    {name:"حول الشركة",
    href:'#'
    },
    {name:"الفئات",
    href:'categories'
    },
  ];
  useEffect(()=>{
    if(Cookies.get('user')){
      const cookieValue = JSON.parse(Cookies.get('user'));
      setUser(cookieValue);
      console.log('cookies on navbar :');
      console.log(user);
      console.log(userToolKit);
    }
  },[])

  return (
    <Navbar className="z-50 bg-[#101113] text-white opacity-75 " onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden "
        />
        <NavbarBrand>

        <Image
        className='rounded-full mx-4'
        src="/logo.png" // Path to the image in the public folder
        alt="logo Image"
        width={50} // Specify the width of the image
        height={50} // Specify the height of the image
      />

        {/* <svg onClick={() => router.push('/')} className='cursor-pointer' fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg> */}




          <p onClick={() => router.push('/')} className="font-bold text-inherit cursor-pointer">RANK STORE</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/categories" className='text-white opacity-100'>
            الفئات
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" className='text-white'>
            حول الشركة
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/rank" className='text-white'>
            العالمية
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* userToolKit.signIn */}
        {user?
        <NavbarContent justify="end">
        <NavbarItem >
          <Avatar onClick={profile} className='cursor-pointer' isBordered color="success" src={user.ImageUrl} />
        </NavbarItem>
        </NavbarContent>
        : 
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/signin" className='text-lg text-white'>تسجيل الدخول</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} className='bg-[#004226] text-white text-lg px-4' href="/signup" variant="flat">
            انشأ حساب
          </Button>
        </NavbarItem>
      </NavbarContent>
    }


      <NavbarMenu className='bg-black text-white'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem className='gap-16 pt-4' key={`${item}-${index}`}>
            <Link
              
              className="w-full text-white text-5xl"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
