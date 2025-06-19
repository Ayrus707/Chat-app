"use client"
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { useThemeColor } from '@/app/context/ThemeContext'
import clsx from 'clsx';
interface MessageInputProps{
    placeholder?:string;
    id:string;
    type?:string;
    required?:boolean;
    register:UseFormRegister<FieldValues>
    errors:FieldErrors
}

const MessageInput:React.FC<MessageInputProps> = ({
    placeholder,id,type,required,register,errors
}) => {
   const { themeColor } = useThemeColor();
  const colorMap: Record<string, string> = {
      Red: 'outline-red-300',
      Orange: 'outline-orange-300',
      Yellow: 'outline-yellow-300',
      Green: 'outline-green-300',
      Purple: 'outline-purple-300',
    };
  return (
    <div className='relative w-full '>
        <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id,{required})}
        placeholder={placeholder}
        className={clsx(`
        text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline `,colorMap[themeColor]|| 'outline-blue-300'
        )}
        />
    </div>
  )
}

export default MessageInput