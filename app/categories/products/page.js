'use client'
import React from "react";
import { useState,useEffect  } from 'react';
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import NavBar from '@/components/NavBar'
import {Input} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";
import { useRouter } from 'next/navigation'
import { getProducts} from '../../firebase';
export default function App() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const list = [
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className='min-h-screen w-full  bg-[#101113] flex flex-col'>
        <NavBar/>
        <div className='md:px-24 px-8 mt-4 mx-w-2/4'>
        <Input
        label="Search"
        isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
           
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "dark:bg-default/30",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
      </div>
    <div className="gap-2 grid grid-cols-1 bg-[#101113]  sm:grid-cols-2 md:grid-cols-4 p-8">
      {products.map((item, index) => (
        <Card onClick={() => router.push('/productDetails')} shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.name}
              className="w-full object-cover h-[140px]"
              src={item.imageUrl[0]}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.name}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>
  );
}
