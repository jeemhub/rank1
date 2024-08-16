'use client'
import {Button} from "@nextui-org/react";
import NavBar from '@/components/NavBar'
import Link from 'next/link';

export default function (){
    
    return(
        <>
        <NavBar/>
            <div className='min-h-screen flex flex-col justify-center items-center bg-[#101113] text-white gap-6'>
                <Link href='/rank/level'>
            <Button className='text-4xl p-8 px-16' color="primary" variant="ghost">
                    من حيث المستوى
                    </Button>  
                    </Link>
                    
                    <Link href='/rank/aura'>
            <Button className='text-4xl p-8 px-16' color="primary" variant="ghost">
                    من حيث النقاط
                    </Button>  
                    </Link>
            </div>
        </>
    )
};