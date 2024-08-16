'use client'
import { useRouter } from 'next/navigation';
import { useEffect ,useState} from 'react';
export default function testid( {params} ){
    const [id,setId]=useState('');
    const router =useRouter();

useEffect(()=>{
    const idQuary= params.id
    setId(idQuary);
},[])
    return(
        <>
            <div className="flex flex-col justify-center items-center text-3xl font-bold text-black min-h-screen bg-gray-300">
                <h1>{id}</h1>
            </div>
        </>
    )
}