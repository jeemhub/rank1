"use client"
import { useState,useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Card, CardBody, CardFooter,Image} from "@nextui-org/react";
//import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import NavBar from '../../../../components/NavBar'
import { getProducts} from '../../../firebase';
import { useRouter } from 'next/navigation'

export default function ProductDetails({params}) {
    const router = useRouter();

    const [quantity, setQuantity] = useState(1);
    const [favorite, setFavorite] = useState(false);
    const [selectedTab, setSelectedTab] = useState('description');
    const [product,setProduct]=useState({});
    const [loading,setLoading]=useState(true);
    const [products, setProducts] = useState([]);
    const [relatedProducts,setRelatedProduct]=useState([]);
    // const product = {
    //     name: "Premium Wireless Headphones",
    //     price: 199.99,
    //     rating: 4.5,
    //     reviews: 128,
    //     description: "Experience unparalleled sound quality with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
    //     features: [
    //         "40mm dynamic drivers for deep, rich sound",
    //         "Active Noise Cancellation for immersive listening",
    //         "30-hour battery life",
    //         "Comfortable over-ear design",
    //         "Bluetooth 5.0 for seamless connectivity"
    //     ],
    //     specs: {
    //         "Bluetooth Version": "5.0",
    //         "Battery Life": "Up to 30 hours",
    //         "Charging Time": "2 hours",
    //         "Weight": "250g",
    //         "Warranty": "2 years"
    //     }
    // };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "ease-in-out",
        adaptiveHeight: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
      };
    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i - 0.5 <= rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }
        return stars;
    };
function productById(allProducts,id){
const product=[];
    for(let i=0;i<allProducts.length;i++){
        if(allProducts[i].id==id){
            product.push(allProducts[i]);
        }
    }
    return product[0]
}
useEffect(()=>{

    console.log('params : ')
    console.log(params.productDetails)
    console.log(params.products)

    const fetchProducts = async () => {
        try {
        const allProducts = await getProducts();
        var related=[];
        for(let i=0;i<allProducts.length;i++){
            if(allProducts[i].related){
                related.push(allProducts[i]);
            }
        }
        setRelatedProduct(related);
        const pro=productById(allProducts,params.productDetails);
        setProducts(allProducts);
        console.log(allProducts);
        setProduct(pro)
        console.log(product);
        if(product){
            setLoading(false);
        }
        } catch (error) {
        console.error('Error fetching products:', error);
        }
    };
    fetchProducts()
    },[])
    return (<>
  
        {loading?
            <div className='w-full min-h-screen max-w-7xl mx-auto h-auto flex gap-4 flex-col justify-start items-center p-6 bg-[#101113] text-gray-200'>
            <NavBar/>
            <h1 className='text-3xl text-white font-bold text-center'>Loading...</h1>
            </div>
            :
        <div className='w-full min-h-screen max-w-7xl mx-auto h-auto flex gap-4 flex-col justify-start items-center p-6 bg-[#101113] text-gray-200'>
            <NavBar/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                <div className='w-full min-h-full bg-[#1a1c1e] shadow-xl rounded-lg overflow-hidden'>
                    <Slider {...sliderSettings}>
                        {product.imageUrl.map((item) => (
                            <div key={item} className="relative aspect-square">
                                <Image   
                                    src={item}
                                    alt={`Product image ${item}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className='w-full min-h-full bg-[#1a1c1e] shadow-xl rounded-lg p-6 flex flex-col justify-between items-start'>
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-3xl font-bold text-gray-100">{product.name}</h1>
{/* Like Button */}
                            {/* <button 
                                onClick={() => setFavorite(!favorite)} 
                                className="text-2xl text-red-500 focus:outline-none"
                            >
                                {favorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
                            </button> */}

                        </div>

{/* review */}
                        {/* <div className="flex items-center mb-4">
                            <div className="flex mr-2">{renderStars(product.rating)}</div>
                            <span className="text-gray-400">({product.reviews} reviews)</span>
                        </div>
                         */}
                        <p className="text-2xl font-semibold text-gray-100 mb-4">${product.price}</p>
                        <p className="text-gray-400 mb-6">{product.description}</p>

{/* number of order */}
                        {/* <div className="flex items-center mb-6">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="bg-[#2a2c2e] px-3 py-1 rounded-l-md text-gray-200"
                            >
                                -
                            </button>
                            <input 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-16 text-center border-t border-b border-[#2a2c2e] py-1 bg-[#1a1c1e] text-gray-200"
                            />
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="bg-[#2a2c2e] px-3 py-1 rounded-r-md text-gray-200"
                            >
                                +
                            </button>
                        </div> */}
                        
                    </div>
                    <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105'>
                        اطلب
                    </button>
                </div>
            </div>
            <div className="mt-12 w-full bg-[#1a1c1e] shadow-xl rounded-lg overflow-hidden">
                <div className="flex border-b border-[#2a2c2e]">
                    {['description'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`flex-1 py-3 px-4 text-center font-semibold ${
                                selectedTab === tab ? 'bg-blue-600 text-white' : 'bg-[#2a2c2e] text-gray-300'
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="p-6">
                    {selectedTab === 'description' && (
                        <p className="text-gray-300">{product.description}</p>
                    )}
                    {selectedTab === 'features' && (
                        <ul className="list-disc pl-5 space-y-2">
                            {product.features.map((feature, index) => (
                                <li key={index} className="text-gray-300">{feature}</li>
                            ))}
                        </ul>
                    )}
                    {selectedTab === 'specifications' && (
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            {Object.entries(product.specs).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <dt className="font-semibold text-gray-200">{key}:</dt>
                                    <dd className="text-gray-300">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>
            </div>
            <div className="mt-12 w-full">
                <h2 className="text-2xl font-semibold mb-4 text-gray-100 w-full text-center">المنتجات الاكثر مبيعا</h2>

                <div className="slider-container md:block hidden">
                <Slider {...settings}>
                {relatedProducts.map((item, index) =>(
                            <div className=''>
                             <Card onClick={() => router.push(`/categories/${params.products}/${item.id}`)} shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                             <CardBody className="overflow-visible p-0">
                                 <Image
                                 shadow="sm"
                                 radius="lg"
                                 width={200}
                                 height={100}
                                 alt={item.name}
                                 className="w-full object-cover h-[140px] w-[200px]"
                                 src={item.imageUrl[0]}
                                 />
                             </CardBody>
                             <CardFooter className="text-small justify-between">
                                 <b>{item.name}</b>
                                 <p className="text-default-500">{item.price}$</p>
                             </CardFooter>
                             </Card>
                            </div>
                        ))}
               </Slider>
               </div>

               <div className="slider-container md:hidden block">
                <Slider {...settings2}>
                    {relatedProducts.map((item, index) => (
                        <div className='p-2'>
                        <Card className='min-h-[250px]' onClick={() => router.push(`/categories/${params.products}/${item.id}`)} shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                            shadow="sm"
                            radius="md"
                            width='100%'
                            alt={item.name}
                            className="w-full object-cover h-[140px]"
                            src={item.imageUrl[0]}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{item.name}</b>
                            <p className="text-default-500">{item.price}$</p>
                        </CardFooter>
                        </Card>
                        </div>
                        ))}
                </Slider>
               </div>
                {/* Add a grid or slider for related products here */}
            </div>
        </div>
    }
      </>
    )
}