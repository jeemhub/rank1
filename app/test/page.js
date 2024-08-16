'use client'
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import {useState,useEffect}from 'react'
export default function test(){
    // const notify = () => toast('Here is your toast.',{
    //     duration:1500
    // });
    const [user,setUser]=useState();
    
    const settings={
      user:1,
      name:'jassim',
      age:"24",
      job:"software engineering"
    }
    const settings2={
      user:2,
      name:'mohammed',
      age:"16",
      job:"student"
    }
    const handleSave = () => {
      // تعيين كوكيز
      Cookies.set('myCookie', 'cookieValue', { expires: 7 }); // الكوكيز ستبقى صالحة لمدة 7 أيام
      Cookies.set('settings', JSON.stringify(settings), { expires: 7 }); // الكوكيز ستبقى صالحة لمدة 7 أيام
      setUser(JSON.parse(Cookies.get('settings')))
    };
    const handleSave2 = () => {
      // تعيين كوكيز
      Cookies.set('myCookie', 'cookieValue', { expires: 7 }); // الكوكيز ستبقى صالحة لمدة 7 أيام
      Cookies.set('settings', JSON.stringify(settings2), { expires: 7 }); // الكوكيز ستبقى صالحة لمدة 7 أيام
      setUser(JSON.parse(Cookies.get('settings')))
    };
    const handleLoad = () => {
      // قراءة كوكيز
      const cookieValue = JSON.parse(Cookies.get('settings'));
      console.log(user); // سيظهر قيمة الكوكيز
    };
    const delete2 = () => {
      // قراءة كوكيز
      Cookies.set('myCookie', '', { expires: 7 });
      // سيظهر قيمة الكوكيز
    };
    useEffect(()=>{
      const cookieValue = JSON.parse(Cookies.get('settings'));
      setUser(cookieValue)
      console.log(user);
    },[Cookies.get('settings')])
  return (
    <div className='min-h-screen bg-gray-400 flex flex-col gap-4 justify-center items-center'>
      {/* <button onClick={notify}>Make me a toast</button>
      <Toaster /> */}
      {user?
       <h1>{user.name}</h1>
      :<></>}
       <button clasName='p-2 bg-red-600 px-4 text-xl font-bold rounded-md border-2' onClick={handleSave}>Save Cookie</button>
       <button clasName='p-2 bg-red-600 px-4 text-xl font-bold rounded-md border-2' onClick={handleSave2}>Save 2222</button>
       <button clasName='p-2 bg-red-600 px-4 text-xl font-bold rounded-md border-2' onClick={handleLoad}>Load Cookie</button>
       <button clasName='p-2 bg-red-600 px-4 text-xl font-bold rounded-md border-2' onClick={delete2}>delete</button>
    </div>
  );
}