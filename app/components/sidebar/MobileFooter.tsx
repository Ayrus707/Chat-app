"use client";
import userConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import React from 'react'
import MobileItem from './MobileItem';

const MobileFooter = () => {
    const routes=useRoutes();
    const {isOpen}= userConversation();

    if(isOpen) return null;
  return (
    <div className='
    fixed justify-between w-full bottom-0 z-40  flex items-center bg-white
    border-t-[1px] lg:hidden
    '>
{routes.map((route)=>(
    <MobileItem
    key={route.href}
    href={route.href}
    active={route.active}
    icon={route.icon}
    onClick={route.onClick}
    />
))}
    </div>
  )
}

export default MobileFooter