'use client'

import { useEffect, useState } from 'react';
import { Button, Input, Spacer } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { GrFormEdit, GrAchievement, GrAed } from "react-icons/gr";
import { FaCamera } from 'react-icons/fa';
import { uploadImageUser, updateUser } from '../firebase';
import Cookies from 'js-cookie';

export default function Profile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newName, setNewName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookieUser = Cookies.get('user');
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
  }, []);

  const handleNameEdit = () => {
    if (newName && user) {
      updateUser(user.id, { name: newName });
      setUser(prevUser => ({ ...prevUser, name: newName }));
      Cookies.set('user', JSON.stringify({ ...user, name: newName }), { expires: 7 });
      setNewName('');
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && user) {
      try {
        const result = await uploadImageUser(file, user.id);
        const updatedUser = { ...user, ImageUrl: result.ImageUrl };
        setUser(updatedUser);
        Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 });
        updateUser(user.id, { ImageUrl: result.ImageUrl });
      } catch (error) {
        console.error('Error uploading image: ', error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#101113] text-black">
        <div className="max-w-2xl mx-auto p-4">
          <div className="bg-white min-h-[50vh] shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Image 
                  src={user?.ImageUrl } 
                  alt="Profile Photo"
                  width={120} 
                  height={120} 
                  className="rounded-full"
                />
                <label htmlFor="upload-image-input" className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                  <FaCamera className="text-xl" />
                </label>
                <input
                  id="upload-image-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
              <div className='flex items-center justify-between gap-2'>
                <h1 className="mt-4 font-bold text-xl mb-2">{user?.name}</h1>
                <Button onPress={onOpen} size="sm" auto>
                  <GrFormEdit className='text-3xl' />
                </Button>
              </div>
              <h1 className="text-gray-500">{user?.email}</h1>
              <Spacer y={0.5} />
              <div className="flex flex-col items-start gap-2">
                <div className='flex gap-2'>
                  <GrAchievement className="text-xl" />
                  <h1 className="text-sm text-gray-700">Level: {user?.level}</h1>
                </div>
                <div className='flex gap-2'>
                  <GrAed className="text-xl" />
                  <h1 className="text-sm text-gray-700">Aura: {user?.aura}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          backdrop="opaque"
          radius="lg"
          classNames={{
            base: "bg-[#19172c] text-[#a8b0d3]",
            header: "border-b border-[#292f46]",
            footer: "border-t border-[#292f46]",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">تعديل الاسم</ModalHeader>
                <ModalBody>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    color='secondary'
                    label="اسمك"
                    placeholder="ادخل الاسم الجديد"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    الغاء
                  </Button>
                  <Button color="primary" onPress={() => { handleNameEdit(); onClose(); }}>
                    تأكيد
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}