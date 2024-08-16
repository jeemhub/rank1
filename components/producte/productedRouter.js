'use client'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute ({ children }) {
    const router =useRouter();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
    //   window.location.href = '/login';
       router.push('/admin');
    }
  }, [isAuthenticated]);

  if (!isMounted || !isAuthenticated) {
    return null; // Optionally render a loading spinner or placeholder
  }

  return children;
};

