'use client'
import React from "react";
import { useState,useEffect  } from 'react';
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import NavBar from '@/components/NavBar'
import {Input} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";
import { useRouter } from 'next/navigation'
import { getProducts} from '../../firebase';
export default function App({params}) {
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
  function getProductsByCategory(categoy,products) {
    var newArry=[];
    console.log(products)
    console.log(products[0].categories)
    for(let i=0;i<products.length;i++){
      for(let j=0;j<products[i].categories.length;j++){
        if(products[i].categories[j]=== categoy){
          newArry.push(products[i])
        }
      }
    }
    return newArry
}
  useEffect(() => {
    console.log(params.products)
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        console.log(allProducts)
       
        setProducts(getProductsByCategory(params.products,allProducts));
        console.log(products)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className='min-h-screen w-full  bg-[#101113] flex flex-col'>
        <NavBar/>
    <div className="gap-2 grid grid-cols-1 bg-[#101113]  sm:grid-cols-2 md:grid-cols-4 p-8">
      {console.log('products')}
      {console.log(products)}
      {products.map((item, index) => (

        <Card onClick={() => router.push(`/categories/${params.products}/${item.id}`)} shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
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
