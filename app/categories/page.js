'use client'
import React from "react";
import {Card, Image} from "@nextui-org/react";
import { useState,useEffect  } from 'react';
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/navigation'
import {getCategories} from '../firebase'
import Cookies from 'js-cookie';

export default function CategoriesPage() {
  const [categories,setCategories]=useState([])

    const router = useRouter()
  const handleClickCategory=(id)=>{
    Cookies.set('category', id, { expires: 1 })
  }

  useEffect(() => {
  
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
   
  }, []);
  return (
    <div className='min-h-screen w-full bg-[#101113] flex flex-col'>
      <NavBar/>

      <h1 className="text-4xl font-bold text-center text-white my-8">الفئات</h1>

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-8">
        {categories.map((category, index) => (
          <Card 
            onClick={() => router.push(`/categories/${category.name}`)}
            key={index} 
            className="w-full h-[300px] col-span-1 group cursor-pointer overflow-hidden"
            isPressable
          >
            <Image
              alt={category.name}
              className="z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={category.imageUrl[0]}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="text-white text-2xl font-bold mb-2">{category.name}</h2>
              <div className="w-1/4 h-1 bg-white rounded-full transform origin-left transition-all duration-500 group-hover:w-full" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}