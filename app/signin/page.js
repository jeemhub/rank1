'use client';
import {Input ,Button} from "@nextui-org/react";
import { auth ,db } from "../firebase.config";
import { setDoc,doc,getDoc ,collection} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Link from "next/link";
export default function Home() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [query, setQuery] = useState('');
    const handleInputChange = (e) => {
        setQuery(e.target.value);
      };
      const handleSignIn= async()=>{
        try{
            await signInWithEmailAndPassword(auth ,email,password);
            const user=auth.currentUser;
            console.log(user.uid);
            if(user){
                const docRef=doc(db,"Users",user.uid)
                const userData=await getDoc(docRef);
                if(userData.exists()){
                    console.log('User Data : ')
                    console.log(userData.data());
                }
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
   <div className='min-h-screen bg-[#101113] flex justify-center items-center flex-col'> 
    <div className='min-w-4/5 w-3/5 p-4 rounded-md flex flex-col justify-start items-center bg-white h-auto m-4 gap-4'>
        <h1 className='font-bold text-xl p-4 text-center w-full text-black'>تسجيل الدخول</h1>
        <Input  onChange={(e)=>setEmail(e.target.value)} value={email} type="email" label="Email" />
        <Input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" label="Password" />
        <Button onClick={handleSignIn} className='text-white bg-[#004226] text-2xl duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>
          تسجيل الدخول
        </Button>
        <Link className="text-xl text-[#004226] font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" href='/signup'>انشأ حساب</Link>
    </div>
    <Link href='/' className='text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>الرجوع للصفحة الرئيسية</Link>
   </div>
  );
}
