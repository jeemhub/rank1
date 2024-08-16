'use client'
import { useEffect, useState } from 'react';
import {Input ,Button} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
const adminPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router =useRouter();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  function handleSignUp(){
    dispatch(login());
    router.push('/admin/dashboard')
  }
  return (
    <div className='min-h-screen bg-[#101113] flex justify-center items-center flex-col'> 
    <div className='min-w-4/5 w-3/5 p-4 rounded-md flex flex-col justify-start items-center bg-white h-auto m-4 gap-4'>
        <h1 className='font-bold text-xl p-4 text-center w-full text-black'>Admin Page</h1>
        <Input  onChange={(e)=>setEmail(e.target.value)} value={email} type="email" label="Email" />
        <Input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" label="Password" />
        <Button onClick={handleSignUp} color="success">
          تسجيل الدخول
        </Button>
    </div>
    <Link href='/' className='text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>الرجوع للصفحة الرئيسية</Link>
   </div>
  );
};

export default adminPage;
