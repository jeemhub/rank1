'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea ,Select,SelectItem } from "@nextui-org/react";
import { useState,useEffect  } from 'react';
import Image from 'next/image'
import {addCategories , uploadImageCategories ,updateCategory,getCategories ,deleteCategory} from "../../../firebase"
import { FaCamera } from 'react-icons/fa';
import Link from "next/link";

// import categories from './page';
export default function categories (){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [backdrop, setBackdrop] = useState('blur');
    const [query, setQuery] = useState('');
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [categoryData,setCategoryData]=useState({});
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [categories,setCategories]=useState([])
    const [loading,setLoading]=useState(false);
//================ Input change ==========================

    const handleInputChange = (e) => {
        setQuery(e.target.value);
      };

//================ handle Add Categores ==========================

const handleAddCategory = async () => {
  setLoading(true)
  try {
    const categorytId = await addCategories(categoryData);

    if (selectedFile && selectedFile.length > 0) {
      const uploadPromises = selectedFile.map(file =>
        uploadImageCategories(file, categorytId)
      );
      const imageUrls = await Promise.all(uploadPromises);
        // console.log(imageUrls);
      await updateCategory(categorytId, { imageUrl: imageUrls });
      await updateCategory(categorytId, { categorytId: categorytId });
      setCategoryData({ ...categoryData, imageUrl: imageUrls });
      setCategoryData({ ...categoryData, categorytId: categorytId });
    }

    setCategoryData([...categoryData, { id: categorytId, ...categoryData }]);

    setCategoryData({});
    setSelectedFile(null);
    setCreateObjectURL(null)
  } catch (error) {
    console.error('Error adding product:', error);
  }
  //window.location.reload();
  setLoading(false)
};


//================ Items ==========================

const items = [
  { id: 1, title: "Product 1", details: "Details for product 1", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FO92PvfwlRN5aftXjEwI3%2F4578c3c603f26da33089a8b4c7d8c265.jpg?alt=media&token=ecefa1a1-d468-414d-958a-d42fbddb5ebf" },
  { id: 2, title: "Product 2", details: "Details for product 2", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FhulWwgnXz9TFzYz07GuX%2Fmaar-gaming-fG4BTSKPo3w-unsplash.jpg?alt=media&token=09b8696a-a2c4-4144-aae8-5ddaa0f0f397"},
  { id: 3, title: "Product 3", details: "Details for product 3", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FO92PvfwlRN5aftXjEwI3%2F4578c3c603f26da33089a8b4c7d8c265.jpg?alt=media&token=ecefa1a1-d468-414d-958a-d42fbddb5ebf" },
  { id: 3, title: "Product 3", details: "Details for product 3", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FO92PvfwlRN5aftXjEwI3%2F4578c3c603f26da33089a8b4c7d8c265.jpg?alt=media&token=ecefa1a1-d468-414d-958a-d42fbddb5ebf" },
  { id: 3, title: "Product 3", details: "Details for product 3", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FO92PvfwlRN5aftXjEwI3%2F4578c3c603f26da33089a8b4c7d8c265.jpg?alt=media&token=ecefa1a1-d468-414d-958a-d42fbddb5ebf" },
  { id: 3, title: "Product 3", details: "Details for product 3", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FO92PvfwlRN5aftXjEwI3%2F4578c3c603f26da33089a8b4c7d8c265.jpg?alt=media&token=ecefa1a1-d468-414d-958a-d42fbddb5ebf" },
  { id: 4, title: "Product 4", details: "Details for product 4", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FhulWwgnXz9TFzYz07GuX%2Fmaar-gaming-fG4BTSKPo3w-unsplash.jpg?alt=media&token=09b8696a-a2c4-4144-aae8-5ddaa0f0f397" }
  // Add more products as needed
];

//================ handle Image Upload  ==========================

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
const handleOpen = (backdrop) => {
  setBackdrop(backdrop)
  onOpen();
}

const uploadToClient = (event) => {
  //====================== new ====== multi file ============
const files = event.target.files;
if (files) {
// Convert FileList to array
const filesArray = Array.from(files);

// Create object URLs for each file
const objectURLs = filesArray.map(file => URL.createObjectURL(file));

// Set the state with selected files and their object URLs
setSelectedFile(filesArray);
setCreateObjectURL(objectURLs);
}
};

const handleDeleteCategory= async (x)=>{
  console.log(x);
  setLoading(true)
  try{
    await deleteCategory(x);
    var oldCategories=categories;
    var newCategories=[];
    for(let i=0;i<oldCategories.length;i++){
      if(oldCategories[i].id != x){
        newCategories.push(oldCategories[i]);
      }
    }
    setCategories(newCategories);
    setLoading(false)
  }catch(err){
    console.log(err);
  }
 // window.location.reload();
}

//================ use Effect ===============================

useEffect(() => {
  console.log(categoryData);
  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  fetchCategories();
}, [categoryData]);




//=============== Return =====================================
    return(
        <div className="flex flex-col justify-start items-center w-full p-12 min-h-screen bg-[#101113]">
          <button onClick={() => handleOpen("blur")} className='rounded-full bg-[#004226] p-2 px-24 text-xl mb-8'>
        اضافة فئة
      </button>
      <Link href='/admin/dashboard' className='text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none mb-4'>الرجوع للوحة التحكم </Link>

          <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black font-bold">اضافة المنتج</ModalHeader>
              <ModalBody>
           
                <Input 
                value={categoryData.name}
                onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
                size="md" type="text" label="اسم الفئة" placeholder="اكتب اسم الفئة" />
                {/* Image upload component */}
                <div className="flex flex-col items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={uploadToClient}
                    />
                  </label>
                  {createObjectURL && (
                    <div className="mt-4 flex flex-wrap gap-4">
                    {createObjectURL.map((url, index) => (
                      <Image
                        key={index}
                        src={url}
                        alt={`Uploaded image ${index + 1}`}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    ))}
                  </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  الغاء
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleAddCategory}>
                  اضافة
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
{/* ===================== شريط الاضافة ================================= */}
{/* <div className="relative my-8">
        <input
          type="text"
          // value={query}
          // onChange={handleInputChange}
          className="w-full py-2 pl-12 pr-14 text-center text-gray-700 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="اكتب اسم الفئة"
        />
        <label htmlFor="imageUpload" className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
          <FaCamera className={`text-gray-400 ${image?'text-Purple-700':'text-gray-400'} transition-colors`} />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          // onChange={handleImageUpload}
          className="hidden"
        />
     
      <button
        // onClick={handleAddCategores}
        className="absolute right-0 top-0 bottom-0 px-4 text-white bg-blue-500 rounded-r-full z-50 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
      >
        اضف
      </button>
 </div> */}


 {/**
  * 
      {image && (
        <div className="mt-2 border border-2 border-black min-w-xl rounded-md mb-8">
          <img src={image} alt="Uploaded" className="w-full h-32 object-cover rounded-md" />
        </div>
      )}

*/}

{/* ===================== الفئات ================================= */}
{
  (categories.length != 0 && !loading) ?
  <div className='grid md:grid-cols-4 grid-cols-1 gap-4 w-full md:px-16'>
        {categories && categories.map((category,index) => (
          <div key={index} className='flex flex-col w-full h-96 bg-white text-black rounded-xl overflow-hidden min-w-1/4 shadow-md hover:shadow-2xl hover:translate-y-2 duration-300 '>
            <div className="h-48 relative">
              {
                  category.imageUrl &&
              <Image
                src={category.imageUrl[0]}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
            }
            </div>
            <div className='flex flex-col gap-2 text-black px-4 flex-grow'>
              <h1 className='text-xl font-bold'>{category.name}</h1>
            </div>
            <div className="p-4">
              <button onClick={()=>handleDeleteCategory(category.categorytId)} className='w-full py-2 bg-[#f86031] text-xl text-white cursor-pointer rounded-md'>
                 حذف
              </button>
            </div>
          </div>
        ))}
      </div>
  :
  <div className='flex flex-col justify-center items-center text-3xl text-white font-bold min-h-screen'>
         loading ...
         </div> 
}
      
{/* =====================  ===============================  ================================= */}

        

</div>)}