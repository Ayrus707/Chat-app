"use client"
import React from 'react'
import userConversation from '@/app/hooks/useConversation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { HiPaperAirplane } from 'react-icons/hi2';
import {CldUploadButton} from "next-cloudinary" 
import { encryptMessage } from '@/app/libs/crypto'
import { useThemeColor } from '@/app/context/ThemeContext';
import { useState } from 'react';
import { PiGifFill } from "react-icons/pi";
import Tooltip from '@/app/components/Tooltip';


import GifPicker from './GifPicker'; 
const Form = () => {
  const [gifPickerOpen, setGifPickerOpen] = useState(false);
  const { themeColor } = useThemeColor();
const colorMap: Record<string, string> = {
    Red: 'bg-red-500 hover:bg-red-600',
    Orange: 'bg-orange-500 hover:bg-orange-600',
    Yellow: 'bg-yellow-500 hover:bg-yellow-600',
    Green: 'bg-green-500 hover:bg-green-600',
    Purple: 'bg-purple-500 hover:bg-purple-600',
  };
    const {converationId}=userConversation();
    const{ register,handleSubmit,setValue,formState:{errors,}
} =useForm<FieldValues>({
        defaultValues:{
            message:''
        }
    })

    // const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    //     setValue('message','',{shouldValidate:true});
    //     axios.post('/api/messages',{
    //         ...data,
    //         conversationId:converationId
    //     })
    // }


const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const encryptedBody = encryptMessage(data.message); // Encrypt the message
  console.log("Encrypted:", encryptedBody);
    setValue('message', '', { shouldValidate: true });

    axios.post('/api/messages', {
        message: encryptedBody,
        conversationId: converationId
    });
};



    // const handleUpload=(result:any)=>{
    //     console.log("Received data:");
    //     axios.post('/api/messages',{
    //         image:result?.info?.secure_url,
    //         conversationId:converationId
            
    //     })
    // }
    const handleUpload = (result: any) => {
        console.log("Cloudinary upload result:", result);

        axios.post('/api/messages', {
          image: result?.info?.secure_url,
          conversationId: converationId,
        });
      };

      const handleGifSelect = (gifUrl: string) => {
  axios.post('/api/messages', {
    image: gifUrl,
    conversationId: converationId,
  });
};
  return (
    <div
    className='py-4 px-4 bg-white border-t flex items-center gap-4 lg:gap-4
    w-full
    '
    >
    <CldUploadButton
    options={{maxFiles:1}}
    onSuccess={(result) => {
        // console.log("UPLOAD SUCCESS TRIGGERED");
        handleUpload(result);
      }}
    uploadPreset='chat-media'
     >
    {/* <HiPhoto size={25} className='text-green-500'/> */}
    <Tooltip text='Send Media/Documents'>
     <div className="flex items-center justify-center w-8 h-8">
     <HiPhoto 
    size={25} 
    className={`text-${themeColor.toLowerCase()}-500 ${!colorMap[themeColor] ? 'text-blue-500' : ''}`} 
/>
</div>
</Tooltip>

    </CldUploadButton>
    <Tooltip text="Send Gif's">
       <div className="flex items-center justify-center w-8 h-8">
    <PiGifFill 
  size={28}
  onClick={() => setGifPickerOpen(true)}
  className={`text-${themeColor.toLowerCase()}-500 ${!colorMap[themeColor] ? 'text-blue-500' : ''}`}
/>
</div>
</Tooltip>
    <form onSubmit={handleSubmit(onSubmit)}
    className='flex items-center gap-2  lg:gap-4 w-full'
    >
        <MessageInput id="message"
        register={register}
        errors={errors}
        required
        placeholder="Write a Message..."
        />
        <button type='submit'
       className={`rounded-full p-2 cursor-pointer transition text-white ${
  themeColor === 'Default' || !colorMap[themeColor]
    ? 'bg-sky-500 hover:bg-sky-600'
    : colorMap[themeColor]
}`}
        >
            <HiPaperAirplane size={20} className='text-white'/>
        </button>
        <GifPicker
  isOpen={gifPickerOpen}
  onClose={() => setGifPickerOpen(false)}
  onSelect={handleGifSelect}
/>
    </form>
    </div>
  )
}

export default Form