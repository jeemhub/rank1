'use client'
import toast, { Toaster } from 'react-hot-toast';
export default function test(){
    const notify = () => toast('Here is your toast.',{
        duration:1500
    });

  return (
    <div className='min-h-screen bg-gray-400'>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
}