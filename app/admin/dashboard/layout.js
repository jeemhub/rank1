'use client'
import ProtectedRoute from "@/components/producte/productedRouter";
import { useEffect } from "react";
export default function DashboardLayout({ children }) {
    useEffect(()=>{
      if (typeof window !== "undefined") {
        // This code will only run on the client side
        const cookiesUser = JSON.parse(Cookies.get('user'));
        console.log('User from cookies:', cookiesUser);
        setUser(cookiesUser);
      }
    },[])
    return (
        <ProtectedRoute>
                {children}
        </ProtectedRoute>
     )
   }