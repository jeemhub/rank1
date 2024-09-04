'use client';
import {Input ,Button,Spinner} from "@nextui-org/react";
import { auth ,db } from "../firebase.config";
import { setDoc,doc,addDoc ,collection} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {getUsers} from '@/app/firebase'

export default function Home() {
    const router =useRouter();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [query, setQuery] = useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false)
    const [errorMsg,setErrorMsg]=useState('')
    const [btnState,setBtnState]=useState(false);
    const [emailCheckState,setEmailCheckState]=useState(false);
    const [emailState,setEmailState]=useState(false);
    const emailCheck=async()=>{
      try{
        const users = await getUsers();
        for(let i=0;i<users.length;i++){
          if(users[i].email == email){
            setError(true);
            setEmailState(true);
            setErrorMsg('هذا الايميل مستخدم لحساب اخر')
          }
        }
        setEmailCheckState(true);
      }catch(err){
        console.log(err)
      }
    }
    const handleInputChange = (e) => {
        setQuery(e.target.value);
      };
      const handleSignUp= async()=>{
        if(email == ''){
          setError(true)
          setErrorMsg('ادخل الايميل')
          return
        }
        if(name == ''){
          setError(true)
          setErrorMsg('ادخل الاسم')
          return
        }
        if(password == ''){
          setError(true)
          setErrorMsg('ادخل الرمز السري')
          return
        }
        setBtnState(true)
        setErrorMsg('')
        setError(false)
        setEmailCheckState(false)
        setEmailState(false);
        if(!emailCheckState){
          emailCheck();
        }
        console.log('!emailState')
        console.log(!emailState)
        console.log('emailState')
        console.log(emailState)
        if(!emailState){
        try{
          console.log('try in in in in ... ... ...')
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
            setBtnState(false);
            router.push('/signin');   

        }catch(err){
          setBtnState(false);
          setError(true);
          setErrorMsg('هذا الايميل مستخدم لحساب اخر')
          console.log(err)
        }
      }else{
        setBtnState(false);
        setEmailCheckState(false)
        setEmailState(false);
        return
      }
    }
    if(loading){
        return(
          <div className='h-screen w-full flex flex-col justify-center items-center'>
           <Spinner label="Loading" color="success" labelColor="success"/>
          </div>
        )
      }
  return (
   <div className='min-h-screen bg-[#101113] flex justify-center items-center flex-col'> 
    <div className='min-w-4/5 w-3/5 p-4 rounded-md flex flex-col justify-start items-center bg-white h-auto m-4 gap-4'>
        <h1 className='font-bold text-xl p-4 text-center w-full text-black'>انشأ حساب</h1>
        {error?
         <div className='w-full p-4 bg-red-100 text-red-600 rounded-md font-medium'>
            {errorMsg}
       </div>
       :
       <></>
      }
        <Input  onChange={(e)=>setName(e.target.value)} value={name} type="text" label="Name" />
        <Input  onChange={(e)=>setEmail(e.target.value)} value={email} type="email" label="Email" />
        <Input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" label="Password" />
        {btnState?
        <Button color="default">
          <Spinner label="" color="Success" labelColor="Success"/>
      </Button>
    :
        <Button onClick={handleSignUp} className='text-white bg-[#004226] text-2xl duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>
          انشأ الحساب
        </Button>
}
        <Link className="text-xl text-[#004226] font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" href='/signin'>تسجيل الدخول</Link>
    </div>
    <Link href='/' className='text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>الرجوع للصفحة الرئيسية</Link>
   </div>
  );
}
