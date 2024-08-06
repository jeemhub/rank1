'use client';
import Link from "next/link";

import headerDashboard from '../../../components/headerDashboard'
export default function Dashboard() {
  return (
    <div className='flex flex-col bg-[#101113] text-white justify-start items-center min-h-screen h-screen'>
        <h1 className='text-2xl text-white my-8 text-center'>لوحة التحكم</h1>
        <Link className='text-white bg-[#004226] px-8 py-4  rounded-md my-4 w-64 text-center md:w-96 md:text-2xl ' href='/admin/dashboard/accounts'>الحسابات</Link>
        <Link className='text-white bg-[#004226] px-8 py-4  rounded-md my-4 w-64 text-center md:w-96 md:text-2xl ' href='/admin/dashboard/product'>المنتجات</Link>
        <Link className='text-white bg-[#004226] px-8 py-4  rounded-md my-4 w-64 text-center md:w-96 md:text-2xl ' href='/admin/dashboard/categories'>الفئات</Link>
        <Link href='/' className='text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>الرجوع للصفحة الرئيسية</Link>

    </div>
  );
}
