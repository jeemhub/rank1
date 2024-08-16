import ProtectedRoute from "@/components/producte/productedRouter";
export default function DashboardLayout({ children }) {
    return (
        <ProtectedRoute>
                {children}
        </ProtectedRoute>
     )
   }