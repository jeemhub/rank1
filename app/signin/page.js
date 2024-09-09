'use client';
import {Input ,Button,Spinner} from "@nextui-org/react";
import { auth ,db } from "../firebase.config";
import { setDoc,doc,getDoc ,collection} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {signIn} from './userSlice'
import Link from "next/link";
export default function Home() {
  const router =useRouter();

    const userToolKit = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [query, setQuery] = useState('');
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(false)
    const [profile,setProfile]=useState({id:'',name:'',email:'',password:'',level:'',aura:'',band:false,signin:false});
    const [error,setError]=useState(false)
    const [errorMsg,setErrorMsg]=useState('')
    const [btnState,setBtnState]=useState(false);
    const handleInputChange = (e) => {
        setQuery(e.target.value);
      };
      const test=()=>{
        console.log('profile : ');
        console.log(profile);
        console.log('userToolKit : ');
        console.log(userToolKit);
      }
      const handleSignIn= async()=>{
        setBtnState(true);
        try{
            await signInWithEmailAndPassword(auth ,email,password);
            const user=auth.currentUser;
            // console.log(user.uid);
            if(user){
                const docRef=doc(db,"Users",user.uid)
                const userData=await getDoc(docRef);
                if(userData.exists()){
                    const userx = userData.data();
                    
                      if(userx.ImageUrl){
                        setProfile({
                          id:userx.id,
                          name: userx.name,
                          email: userx.email,
                          level: userx.level,
                          aura: userx.aura,
                          band: userx.band,
                          signIn: true,
                          ImageUrl:userx.ImageUrl
                        })
                        Cookies.set('user', JSON.stringify({
                          id:userx.id,
                          name: userx.name,
                          email: userx.email,
                          level: userx.level,
                          aura: userx.aura,
                          band: userx.band,
                          signIn: true,
                          ImageUrl:userx.ImageUrl
                        }), { expires: 7 });
                      }else{
                        setProfile({
                          id:userx.id,
                          name: userx.name,
                          email: userx.email,
                          level: userx.level,
                          aura: userx.aura,
                          band: userx.band,
                          signIn: true
                        });
                        Cookies.set('user', JSON.stringify({
                          id:userx.id,
                          name: userx.name,
                          email: userx.email,
                          level: userx.level,
                          aura: userx.aura,
                          band: userx.band,
                          signIn: true
                        }), { expires: 7 });
                      }
                      console.log(profile);
                      // router.push('/')
                      
                    // console.log('User Data : ')
                    // console.log(userData.data());
                    // var userx=userData.data()
                    // setProfile({...profile,id:userData.data().id});
                    // setProfile({...profile,name:userData.data().name});
                    // setProfile({...profile,email:userData.data().email});
                    // setProfile({...profile,password:userData.data().password});
                    // setProfile({...profile,level:userData.data().level});
                    // setProfile({...profile,aura:userData.data().aura});
                    // setProfile({...profile,band:userData.data().band});
                    // console.log(profile);
                    setLoading(false);
                    router.push('/')   
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
        }catch(err){
          setBtnState(false);
                  setError(true);
                  setErrorMsg('خطأ في الايميل وكلمة السر')
                  
            console.log('the error is : ')
            console.log(err)
        }
    }
    useEffect(() => {
        console.log('Updated profile:', profile);
        dispatch(signIn(profile))
        if(Cookies.get('user')){
          const cookiesUser=JSON.parse(Cookies.get('user'))
          console.log('befor useState:', cookiesUser);
          setUser(cookiesUser);
          console.log('cookies after sigin')
          console.log(user)
        }
        
      
        // if(userToolKit.signin){
        //   router.push('/')
        // }
      }, [profile,userToolKit]);
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
        <h1 className='font-bold text-xl p-4 text-center w-full text-black'>تسجيل الدخول</h1>
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
        <Button onClick={handleSignIn} className='text-white bg-[#004226] text-2xl duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>
          تسجيل الدخول
        </Button>
       }
        {/* <Button onClick={test} className='text-white bg-blue-600 text-2xl duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>
         test
        </Button> */}
        <Link className="text-xl text-[#004226] font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" href='/signup'>انشأ حساب</Link>
    </div>
    <Link href='/' className='text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>الرجوع للصفحة الرئيسية</Link>
   </div>
  );
}
