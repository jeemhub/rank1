import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import {AcmeLogo} from "./AcmeLogo.jsx";
import { useRouter } from 'next/navigation'
export default function App() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "العالمية",
    "حول الشركة",
    "الفئات",
    
  ];

  return (
    <Navbar className="z-50 bg-[#101113] text-white opacity-75 " onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden "
        />
        <NavbarBrand>
        <svg onClick={() => router.push('/')} className='cursor-pointer' fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
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
          <Link color="foreground" href="#" className='text-white'>
            العالمية
          </Link>
        </NavbarItem>
      </NavbarContent>
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
      <NavbarMenu className='bg-black text-white'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem className='gap-4' key={`${item}-${index}`}>
            <Link
              
              className="w-full text-white text-lg"
              href={item}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
