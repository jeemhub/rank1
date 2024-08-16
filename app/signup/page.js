'use client';
import {Input ,Button} from "@nextui-org/react";
import { auth ,db } from "../firebase.config";
import { setDoc,doc,addDoc ,collection} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
      const handleSignUp= async()=>{
        try{
            await createUserWithEmailAndPassword(auth ,email,password);
            const user=auth.currentUser;
            console.log(user);
            if(user){
                //     await addDoc(collection(db, 'Users',user.uid), {
                //     id:user.uid,
                //     email:user.email,
                //     name:name
                // });
                //  addDoc(collection(db, 'Users')
                await setDoc(doc(db,"Users",user.uid),{
                    id:user.uid,
                    email:user.email,
                    name:name,
                    aura:0,
                    level:0,
                    ImageUrl:'https://th.bing.com/th/id/R.b1b463303db368fd76ad68356d1d4f0c?rik=lY2e9ubl6ESqZg&pid=ImgRaw&r=0',
                    band:false,
                })
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
   <div className='min-h-screen bg-[#101113] flex justify-center items-center flex-col'> 
    <div className='min-w-4/5 w-3/5 p-4 rounded-md flex flex-col justify-start items-center bg-white h-auto m-4 gap-4'>
        <h1 className='font-bold text-xl p-4 text-center w-full text-black'>انشأ حساب</h1>
        <Input  onChange={(e)=>setName(e.target.value)} value={name} type="text" label="Name" />
        <Input  onChange={(e)=>setEmail(e.target.value)} value={email} type="email" label="Email" />
        <Input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" label="Password" />
        <Button onClick={handleSignUp} className='text-white bg-[#004226] text-2xl duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>
          انشأ الحساب
        </Button>
        <Link className="text-xl text-[#004226] font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" href='/signin'>تسجيل الدخول</Link>
    </div>
    <Link href='/' className='text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>الرجوع للصفحة الرئيسية</Link>
   </div>
  );
}
