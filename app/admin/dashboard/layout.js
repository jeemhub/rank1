'use client'
import ProtectedRoute from "@/components/producte/productedRouter";
import { useEffect } from "react";
export default function DashboardLayout({ children }) {
    return (
        <ProtectedRoute>
                {children}
        </ProtectedRoute>
     )
   }