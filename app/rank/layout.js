'use client'
import { useEffect } from "react"

export default function({ Children }){
    useEffect(()=>{
        if (typeof window !== "undefined") {
            // This code will only run on the client side
            const cookiesUser = JSON.parse(Cookies.get('user'));
            console.log('User from cookies:', cookiesUser);
            setUser(cookiesUser);
          }
    },[])
    return(
        <>
            {Children}
        </>
    )
}