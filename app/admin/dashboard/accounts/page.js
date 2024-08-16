'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {getUsers,updateUser} from '../../../firebase'
const adminPage = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [users,setUsers]=useState([]);
    const [userId,setUserId]=useState(null);
    const [level,setLevel]=useState(null);
    const [aura,setAura]=useState(null);
    const [userData,setUserData]=useState(null);
    const [loading,setLoading]=useState(false)
    const handleEditButton=(userId)=>{
      for(let i=0;i<users.length;i++){
        if(users[i].id===userId){
          setLevel(users[i].level);
          setAura(users[i].aura);
          setUserData(users[i]);
        }
      }
     console.log(userData)
    }
    const handleBand= async (userId)=>{
      setLoading(true);
      var oldUsers=users;
      for(let i=0;i<users.length;i++){
        if(users[i].id===userId){
          var userx=users[i];
          oldUsers[i].band=!oldUsers[i].band;
          setUsers(oldUsers)
          setUserData(users[i]);
        }
      }
      console.log(userx)
      var bandState=userx.band;
      var newBandState=!bandState;
      try{
        await updateUser(userx.id,{
           ...userx,band:newBandState
         })

        setLoading(false);
       }catch(err){
         console.log(err)
       }
      // window.location.reload();
     }
    
    const handleEditLevelAndAuru= async ()=>{
      // console.log(userData);
      // console.log(level);
      // console.log(aura);
      setLoading(true);
      var oldUsers=users;
      try{
       await updateUser(userData.id,{
          ...userData,level,aura
        })
        for(let i=0;i<oldUsers.length;i++){
          if(oldUsers[i].id==userData.id){
            oldUsers[i].level=level;
            oldUsers[i].aura=aura;
          }
        }
        setUsers(oldUsers);
        setLoading(false);
      }catch(err){
        console.log(err)
      }
      //window.location.reload();
    }

    // const users=[
    //     {
    //         id:1,
    //         name:"jassim",
    //         level:12,
    //         aura:3
    //     },
    //     {
    //         id:2,
    //         name:"mohammed",
    //         level:15,
    //         aura:22
    //     },
    //     {
    //         id:3,
    //         name:"ali",
    //         level:1,
    //         aura:5
    //     },
    //     {
    //         id:4,
    //         name:"abd",
    //         level:2,
    //         aura:3
    //     },
    //     {
    //         id:5,
    //         name:"ahmed",
    //         level:25,
    //         aura:67
    //     }
    // ]
    useEffect(() => {

      const fetchaccounts = async () => {
        try {
          const users = await getUsers();
          setUsers(users);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
    
      fetchaccounts();
    }, []);
  
  return (
    <div className='min-h-screen bg-[#101113] flex justify-start items-center flex-col px-16 py-8'> 

    {(users.length != 0 && !loading) ?
            <table className='border-collapse border border-white w-full text-start' >
              <caption className="caption-top my-4 text-xl">
                  حسابات المستخدمين داخل الموقع
              </caption>

              <thead>
                  <tr>
                    <th className='border-collapse border border-[#004226] text-black text-start bg-white p-4'>الاسم</th>
                    <th className='border-collapse border border-[#004226] text-black text-start bg-white p-4'>المستوى</th>
                    <th className='border-collapse border border-[#004226] text-black text-start bg-white p-4'>النقاط</th>
                    <th className='border-collapse border border-[#004226] text-black text-start bg-white p-4'>الخيارات</th>
                  </tr>
              </thead>

              <tbody>
                {users.map((user,index)=>(
                    <tr key={index}>
                        <td className={`border-collapse border border-[#004226] p-4 ${user.band?'text-red-600':'text-white'}`}>{user.name} {user.band?'( المستخدم محظور )':''}</td>
                        <td className='border-collapse border border-[#004226] p-4'>{user.level}</td>
                        <td className='border-collapse border border-[#004226] p-4'>{user.aura}</td>
                        <td className='border-collapse border border-[#004226] p-4'>
                            <Dropdown backdrop="blur">
                                <DropdownTrigger>
                                    <Button variant="bordered" className='text-white'>
                                        . . .
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu variant="faded" aria-label="Static Actions">
                                        <DropdownItem className='text-black' onClick={()=>{handleEditButton(user.id)}} onPress={onOpen} key="copy">تعديل النقاط والمستوى</DropdownItem>
                                        <DropdownItem  onClick={()=>{handleBand(user.id)}}className='text-red-600 ' key="edit">{user.band?'رفع الحظر':'حظر المستخدم'}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
                  
              </tbody>
           </table>
           :
           <div className='flex flex-col justify-center items-center text-3xl text-white font-bold min-h-screen'>
                  loading ...
                  </div> 
  }

           <Modal 
        backdrop="opaque" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">تعديل النقاط والمستوى</ModalHeader>
              <ModalBody>
                <h1 className='text-center w-full text-xl'> 
                المستوى
                </h1>
                <div className='flex flex-row justify-center items-center mb-4'>
                    <button onClick={()=>setLevel(level-1)} className='text-lg p-2 rounded-md border-2 border-gray-400'>-</button>
                        <h1 className='text-xl text-white font-bold mx-8'>{level}</h1>
                    <button onClick={()=>setLevel(level+1)} className='text-lg p-2 rounded-md border-2 border-gray-400'>+</button>
                </div>
                <hr></hr>
                <h1 className='text-center w-full text-xl mt-4'> 
                  النقاط
                </h1>
                <div className='flex flex-row justify-center items-center '>
                    <button onClick={()=>setAura(aura-1)} className='text-lg p-2 rounded-md border-2 border-gray-400'>-</button>
                        <h1 className='text-xl text-white font-bold mx-8'>{aura}</h1>
                    <button onClick={()=>setAura(aura+1)} className='text-lg p-2 rounded-md border-2 border-gray-400'>+</button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="foreground" variant="light" onPress={onClose}>
                  الغاء
                </Button>
                <Button onClick={handleEditLevelAndAuru} className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                  تأكيد
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Link href='/admin/dashboard' className='mt-4 text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>الرجوع للوحة التحكم</Link>
   </div>
  );
};

export default adminPage;
