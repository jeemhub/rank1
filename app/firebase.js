// firebase.js
import { db, storage } from './firebase.config';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import categories from './admin/dashboard/categories/page';

// Firestore Functions
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), productData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};
export const addCategories = async (categoriestData) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), categoriestData);
    console.log('Document written with ID: ', docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};


export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};
export const getCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return categories;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Users'));
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};



export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting document: ', error);
    throw error;
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, updatedData);
    console.log('Document updated with ID: ', productId);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};
export const updateCategory = async (categoryId, updatedData) => {
  try {
    const docRef = doc(db, 'categories', categoryId);
    await updateDoc(docRef, updatedData);
    console.log('Document updated with ID: ', categoryId);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    await deleteDoc(docRef);
    console.log('Document deleted with ID: ', productId);
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};
export const deleteCategory = async (categoryId) => {
  try {
    const docRef = doc(db, 'categories', categoryId);
    await deleteDoc(docRef);
    console.log('Document deleted with ID: ', categoryId);
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};
export const uploadImage = async (file, productId) => {
  try {
    const storageRef = ref(storage, `products/${productId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image: ', error);
    throw error;
  }
};
export const uploadImageCategories = async (file, categorieId) => {
  try {
    const storageRef = ref(storage, `categories/${categorieId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image: ', error);
    throw error;
  }
};
export const uploadImageUser = async (file, userId) => {
  try {
    //Upload Image
    const storageRef = ref(storage, `Users/${userId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    //Update the user data
    const docRef = doc(db, 'Users', userId);
    await updateDoc(docRef, {ImageUrl:downloadURL});
    return {ImageUrl:downloadURL}
  } catch (error) {
    console.error('Error uploading image: ', error);
    throw error;
  }
};
export const updateUser = async (userId, updatedData) => {
  try {
    const docRef = doc(db, 'Users', userId);
    await updateDoc(docRef, updatedData);
    console.log('Document updated with ID: ', userId);
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};