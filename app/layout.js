'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer} from 'react-toastify';
import { store } from './store'
import { Provider } from 'react-redux'
import { useEffect } from 'react';
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  useEffect(()=>{
    if (typeof window !== "undefined") {
      // This code will only run on the client side
      const cookiesUser = JSON.parse(Cookies.get('user'));
      console.log('User from cookies:', cookiesUser);
      setUser(cookiesUser);
    }
  },[])
 return (
    <html lang="en">
      <body className={inter.className} >
        <NextUIProvider >
          <Provider store={store}>
             {children}
          </Provider>
          <ToastContainer />
        </NextUIProvider>
      </body>
    </html>
  )
}