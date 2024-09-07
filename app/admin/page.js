'use client'
import { useEffect, useState } from 'react';
import {Input ,Button,Spinner} from "@nextui-org/react";
import { setDoc,doc,getDoc ,collection} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { auth ,db } from "@/app/firebase.config";
import Cookies from 'js-cookie';

const adminPage = () => {
  useEffect(()=>{
    if (typeof window !== "undefined") {
      // This code will only run on the client side
      const cookiesUser = JSON.parse(Cookies.get('user'));
      console.log('User from cookies:', cookiesUser);
      setUser(cookiesUser);
    }
  },[])
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router =useRouter();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false)
  const [errorMsg,setErrorMsg]=useState('')
  const [btnState,setBtnState]=useState(false);
  const handleSignIn=async ()=>{
    setError(false);
    setErrorMsg('');
    setBtnState(true);
    try{
      console.log('hi lod')
      await signInWithEmailAndPassword(auth ,email,password);
      const user=auth.currentUser;
      console.log("user.uid")
      console.log(user.uid)
      if(user){
        const docRef=doc(db,"Admin",user.uid)
        const userData=await getDoc(docRef);
        if(userData.exists()){
          const userx = userData.data();
          console.log("userx")
          console.log(userx)
              if(userx.admin){
                // Cookies.set('Admin', JSON.stringify({
                //   admin:true,
                // }), { expires: 7 });
                dispatch(login());
                router.push('/admin/dashboard')
              }else{
                setBtnState(false);
                setError(true);
                setErrorMsg('خطأ في الايميل وكلمة السر')
              }
          }else{
            setBtnState(false);
            setError(true);
            setErrorMsg('خطأ في الايميل وكلمة السر')
          }
      }
    setBtnState(false);
  }catch(err){
            setBtnState(false);
            setError(true);
            setErrorMsg('خطأ في الايميل وكلمة السر')
      console.log(err)
  }
  
  }
  if(loading){
    <div className='h-screen w-full flex flex-col justify-center items-center'>
        <Spinner label="Loading" color="success" labelColor="success"/>
    </div>
  }
  return (
    <div className='min-h-screen bg-[#101113] flex justify-center items-center flex-col'> 
    <div className='min-w-4/5 w-3/5 p-4 rounded-md flex flex-col justify-start items-center bg-white h-auto m-4 gap-4'>
        <h1 className='font-bold text-xl p-4 text-center w-full text-black'>Admin Page</h1>
        {error?
         <div className='w-full p-4 bg-red-100 text-red-600 rounded-md font-medium'>
            {errorMsg}
       </div>
       :
       <></>
      }
       

        <Input  onChange={(e)=>setEmail(e.target.value)} value={email} type="email" label="Email" />
        <Input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" label="Password" />
        {btnState?
        <Button color="default">
          <Spinner label="" color="Success" labelColor="Success"/>
      </Button>
    :
        <Button onClick={handleSignIn} color="success">
          تسجيل الدخول
        </Button>
    }
        

    </div>
    <Link href='/' className='text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>الرجوع للصفحة الرئيسية</Link>
   </div>
  );
};

export default adminPage;
