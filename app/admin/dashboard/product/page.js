'use client';
import { useState,useEffect  } from 'react';
import Image from 'next/image'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea ,Select,SelectItem } from "@nextui-org/react";
import { getProducts, addProduct, updateProduct, deleteProduct, uploadImage ,getCategories} from '../../../firebase';
// import { useRouter } from 'next/router';
import Link from "next/link";

export default function Products() {
  // const router = useRouter();
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [backdrop, setBackdrop] = useState('blur');
  const [image, setImage] = useState(null);

  //******* */
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);

  //******* */
  const [selectedFile, setSelectedFile] = useState(null);

  //******* */
  const [productData, setProductData] = useState({ name: '', price: 0,number:0,description:"", imageUrl: [] });
  const [categories,setCategories]=useState([]);
  const [loading,setLoading]=useState(false);
  const animals = [
    { key: 'cat', label: 'Cat' },
    { key: 'dog', label: 'Dog' },
    { key: 'rabbit', label: 'Rabbit' },
    { key: 'hamster', label: 'Hamster' },
    // Add more animals as needed
  ];
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };


  // const handleAddProduct = async () => {
  //   handleSelectionChange();
  //   try {
  //     const productId = await addProduct(productData);
  //     if (selectedFile && selectedFile.length > 0) {
  //       const imageUrl = await uploadImage(selectedFile, productId);
  //       await updateProduct(productId, { imageUrl });
  //       setProductData({ ...productData, imageUrl });
  //     }
  //     setProducts([...products, { id: productId, ...productData }]);
  //   } catch (error) {
  //     console.error('Error adding product:', error);
  //   }
  //   window.location.reload();
  // };
  const deletehandle=async (x)=>{
    console.log(x);
    setLoading(true)
  try{
    await deleteProduct(x);
    var oldProducts=products;
    var newProducts=[];
    for(let i=0;i<oldProducts.length;i++){
      if(oldProducts[i].id != x){
        newProducts.push(oldProducts[i]);
      }
    }
    setProducts(newProducts);
    setLoading(false)
  }catch(err){
    console.log(err);
  }
  //window.location.reload();
  }
  const handleAddProduct = async () => {
    handleSelectionChange();
    setLoading(true)
    try {
      const productId = await addProduct(productData);
  
      if (selectedFile && selectedFile.length > 0) {
        const uploadPromises = selectedFile.map(file =>uploadImage(file, productId));
        const imageUrls = await Promise.all(uploadPromises);
        console.log('imageUrls :')
        console.log(imageUrls)
        await updateProduct(productId, { imageUrl: imageUrls ,id:productId });
        var newdata=productData;
        newdata.imageUrl=imageUrls;
        newdata.id=productId;

        console.log('newdata')
        console.log(newdata)
        setProducts([...products,newdata]);
      }
      setCreateObjectURL(null);
      setSelectedFile(null);
      setProductData({ name: '', price: 0,number:0,description:"", imageUrl: [] });
      console.log('final test')
      console.log(products);
      setLoading(false)
      
    } catch (error) {
      console.error('Error adding product:', error);
    }
    //window.location.reload();
  };
  


  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      await updateProduct(productId, updatedData);
      setProducts(products.map(product => (product.id === productId ? { id: productId, ...updatedData } : product)));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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

    //====================== old ==== one file ==============
    // const file = event.target.files[0];
    // setSelectedFile(file);
    // if (event.target.files && event.target.files[0]) {
    //   const i = event.target.files[0];
    //   setImage(i);
    //   setCreateObjectURL(URL.createObjectURL(i));
    // }
  };

  // Sample product data with different images
  const items = [
    { id: 1, title: "Product 1", details: "Details for product 1", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FO92PvfwlRN5aftXjEwI3%2F4578c3c603f26da33089a8b4c7d8c265.jpg?alt=media&token=ecefa1a1-d468-414d-958a-d42fbddb5ebf" },
    { id: 2, title: "Product 2", details: "Details for product 2", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FhulWwgnXz9TFzYz07GuX%2Fmaar-gaming-fG4BTSKPo3w-unsplash.jpg?alt=media&token=09b8696a-a2c4-4144-aae8-5ddaa0f0f397"},
    { id: 3, title: "Product 3", details: "Details for product 3", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FO92PvfwlRN5aftXjEwI3%2F4578c3c603f26da33089a8b4c7d8c265.jpg?alt=media&token=ecefa1a1-d468-414d-958a-d42fbddb5ebf" },
    { id: 4, title: "Product 4", details: "Details for product 4", image: "https://firebasestorage.googleapis.com/v0/b/rank-87c16.appspot.com/o/products%2FhulWwgnXz9TFzYz07GuX%2Fmaar-gaming-fG4BTSKPo3w-unsplash.jpg?alt=media&token=09b8696a-a2c4-4144-aae8-5ddaa0f0f397" }
    // Add more products as needed
  ];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }
  const handleSelectionChange = (selectedItems) => {
    if (!selectedItems) {
      console.error('Selected items are undefined or null');
      return;
    }
  
    let selectedArray;
    if (Array.isArray(selectedItems)) {
      selectedArray = selectedItems;
    } else if (typeof selectedItems === 'object' && Symbol.iterator in selectedItems) {
      selectedArray = Array.from(selectedItems);
    } else {
      console.error('Selected items are not iterable:', selectedItems);
      return;
    }
  
    setSelectedCategories(selectedArray);
    setProductData((prevProductData) => ({
      ...prevProductData,
      categories: selectedArray,
    }));
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchCategories();
    fetchProducts();
    console.log("categories : ")
    console.log(categories)
    console.log("products : ")
    console.log(products)
  }, []);

  return (
    <div className="bg-[#101113] w-full min-h-screen flex flex-col justify-start items-center p-8 gap-4 relative">
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black font-bold">اضافة المنتج</ModalHeader>
              <ModalBody>
           
                <Input 
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                size="md" type="text" label="الاسم" placeholder="اكتب اسم المنتج" />
                <Textarea
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                  label="الوصف"
                  placeholder="اكتب وصف المنتج"
                  className="max-w-s"
                />
                 {/* <Input
                 value={productData.number}
                 onChange={(e) => setProductData({ ...productData, number: Number(e.target.value) })}
          type="number"
          label="العدد في المخزن"
          placeholder="0"
          labelPlacement="outside"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small"></span>
            </div>
          }
        /> */}
         <Input
         value={productData.price}
         onChange={(e) => setProductData({ ...productData, price: Number(e.target.value) })}
          type="number"
          label="السعر"
          placeholder="0"
          labelPlacement="outside"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">$</span>
            </div>
          }
        />
        {/* add select here */}
        <Select
                  label="الفئة"
                  placeholder="اختر الفئة"
                  selectionMode="multiple"
                  className="max-w-s text-black"
                  onSelectionChange={handleSelectionChange}
                >
                  {categories?.map((category) => (
                    <SelectItem key={category.name} className='text-black'>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
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
                <Button color="primary" onPress={onClose} onClick={handleAddProduct}>
                  اضافة
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <h1 className="font-bold text-3xl text-white">صفحة المنتجات</h1>

      {/* <div className="relative w-full max-w-md mb-2">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full py-2 pl-4 pr-14 text-center text-gray-700 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:border-blue-500"
          placeholder="Search..."
        />
        <button
          onClick={handleSearch}
          className="absolute right-0 top-0 bottom-0 px-4 text-white bg-blue-500 rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </div> */}

      <button onClick={() => handleOpen("blur")} className='rounded-full bg-[#004226] p-2 px-24 text-xl'>
        اضافة منتج
      </button>
      <Link href='/admin/dashboard' className='text-2xl hover:font-bold duration-700 transition ease-in-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'>الرجوع للوحة التحكم </Link>
      {(products.length != 0 && !loading) ?
        
        <div className='grid md:grid-cols-4 grid-cols-1 gap-4 w-full md:px-16'>
                    {products.map((product,index) => (
                      <div key={index} className='flex flex-col w-full h-96 bg-white text-black rounded-xl overflow-hidden min-w-1/4'>
                        <div className="h-48 relative">
                          <Image
                            src={product.imageUrl[0]}
                            alt={product.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-t-xl"
                          />
                        </div>
                        <div className='flex flex-col gap-2 text-black px-4 flex-grow'>
                          <h1 className='text-xl font-bold'>{product.name}</h1>
                          <p className='text-base opacity-75'>{product.description}</p>
                        </div>
                        <div className="p-4">
                          <button onClick={()=>deletehandle(product.id)} className='w-full py-2 bg-red-600 text-xl text-white cursor-pointer rounded-md'>
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
    </div>
  )
}