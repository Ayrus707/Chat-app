"use client";
import userConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import React from 'react'
import { useState } from 'react';
import MobileItem from './MobileItem';
import CustomModal from './ThemeModal';
import { IoIosColorPalette } from "react-icons/io";
import { useThemeColor } from '@/app/context/ThemeContext';
import clsx from 'clsx';

const MobileFooter = () => {
    const routes=useRoutes();
    const {isOpen}= userConversation();
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false); 
     const { themeColor } = useThemeColor();
      const colorMap: Record<string, string> = {
          Red: 'bg-red-300',
          Orange: 'bg-orange-300',
          Yellow: 'bg-yellow-300',
          Green: 'bg-green-300',
          Purple: 'bg-purple-300',
        };

    if(isOpen) return null;
  return (
    <>
   <div className={clsx(
  'fixed justify-between w-full bottom-0 z-40 flex items-center border-t-[1px] lg:hidden',
  colorMap[themeColor] || 'bg-white'
)}>
{routes.map((route)=>(
    <MobileItem
    key={route.href}
    href={route.href}
    active={route.active}
    icon={route.icon}
    onClick={route.onClick}
    />
))}
 <button
          className="p-4 text-gray-700 hover:text-black hover:bg-gray-100"
          onClick={() => setIsThemeModalOpen(true)}
        >
          <IoIosColorPalette className='h-7 w-7'/> 
        </button>
    </div>
    <CustomModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
      </>
  )
}

export default MobileFooter