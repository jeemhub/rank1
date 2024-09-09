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