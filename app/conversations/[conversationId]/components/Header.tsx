"use client"

import Avatar from '@/app/components/Avatar';
import { Conversation, User } from '@/app/generated/prisma';
import useOtherUser from '@/app/hooks/useOtherUser';
import Link from 'next/link';
import React, { useMemo, useState } from 'react'
import { HiEllipsisHorizontal, HiMiniChevronLeft } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';
import AvatarGroup from '@/app/components/AvatarGroup';
import useActiveList from '@/app/hooks/useActiveList';
import { useThemeColor } from '@/app/context/ThemeContext';

import clsx from 'clsx';

interface HeaderProps{
    conversation:Conversation &{
        users:User[]
    }
}
const Header:React.FC<HeaderProps> = ({
    conversation
}) => {
  const otherUser=useOtherUser(conversation);
  const [drawerOpen,setDrawerOpen]=useState(false);
  const {members}=useActiveList();
  const isActive=members.indexOf(otherUser?.email!)!=-1;
  const { themeColor } = useThemeColor();
    const colorMap: Record<string, string> = {
        Red: 'text-red-500 ',
        Orange: 'text-orange-500',
        Yellow: 'text-yellow-500 ',
        Green: 'text-green-500',
        Purple: 'text-purple-500',
      };
    

  const statusText=useMemo(()=>{


    if(conversation.isGroup){return `${conversation.users.length} members`}

    return isActive ? 'Active':'Offline';
  },[conversation,isActive])
  return (
    <>
    <ProfileDrawer
    data={conversation}
    isOpen={drawerOpen}
    onClose={()=>setDrawerOpen(false)}
    />
      <div className='bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4
    lg:px-6 justify-between items-center shadow-sm
    '>
      <div className='flex  gap-3  items-center'>
        <Link
         className="lg:hidden block cursor-pointer"

        href="/conversations">
        <HiMiniChevronLeft size={30}
        className={colorMap[themeColor] || colorMap.Default}
        />  
        </Link>
        {conversation.isGroup?(
            <AvatarGroup users={conversation.users}/>
        ):(
        <Avatar user={otherUser}/>
      )}
        <div className='flex flex-col '>
          <div>
            {conversation.name||otherUser.name}
          </div>
        <div className='
        text-sm  font-light text-neutral-500
        '>
            {statusText}
        </div>
        </div>
      </div>
      

      <HiEllipsisHorizontal size={36} onClick={()=>setDrawerOpen(true)}
        className={clsx(
    'cursor-pointer',
    colorMap[themeColor] ||colorMap.Default
  )}
        />
      </div>
    </>
  )
}

export default Header










