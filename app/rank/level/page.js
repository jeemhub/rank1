'use client'
import {useState,useEffect} from 'react'
import NavBar from '@/components/NavBar'
import Link from 'next/link';
import {getUsers} from '@/app/firebase'
import {Avatar ,Spinner} from "@nextui-org/react";
import { GrAchievement } from "react-icons/gr";

export default function (){
    const [users,setUsers]=useState([]);
    const sortByLevel = (usersArray) => {
        return usersArray.sort((a, b) => b.level - a.level);
      };
      const sortByAura = (usersArray) => {
        return usersArray.sort((a, b) => b.aura - a.aura);
      };
    useEffect(() => {
        const fetchaccounts = async () => {
          try {
            const users = await getUsers();
            setUsers(sortByLevel(users));
            console.log('users on /rank/level')
            console.log(users)
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };

        fetchaccounts();
      }, []);
    return (
        <>
        <NavBar/>
        <div className='min-h-screen flex flex-col justify-start items-center bg-[#101113] text-white gap-6 md:px-24 px-8 mt-8'>
        <GrAchievement className='text-9xl w-64 text-white' />

            <h1 className='font-bold text-3xl my-2'>
                تصنيف الحسابات من حيث المستوى
            </h1>
            {users.length != 0?
            <div className='flex flex-col gap-2 justify-start items-center w-full'>
                {
                    users.map((user)=>{
                        return(
                            <div className='bg-white text-black text-lg p-4 w-full text-start flex flex-row justify-between items-center rounded-md '>
                                <div className='flex flex-row justify-start items-center gap-2'>
                               {/* image */}
                               <Avatar src={user.ImageUrl} size="lg" />
                               {/* name */}
                               <h1 className='text-lg text-black font-bold'>
                                {user.name}
                               </h1>
                                </div>
                                <h1 className='text-xl text-black font-bold'>{user.level}</h1>
                               {/* level */}
                            </div>
                        )
                    })
                }
            </div>
        :
        <div className='h-screen w-full flex flex-col justify-center items-center'>
        <Spinner label="Loading" color="success" labelColor="success"/>
       </div>
        }
        </div>
        </>
    )
}