"use client"

import { useCallback,useMemo } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Conversation,Message,User } from '@/app/generated/prisma'
import {format} from "date-fns";
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/app/types'
import Avatar from '@/app/components/Avatar'
import AvatarGroup from '@/app/components/AvatarGroup'



interface ConversationBoxProps{
    data:FullConversationType,
    selected?:boolean
}
const ConversationBox:React.FC<ConversationBoxProps> = ({
    data,selected
}) => {
const otherUser=useOtherUser(data)
const session=useSession();
const router=useRouter();

const handleClick=useCallback(()=>{
  router.push(`/conversations/${data.id}`)
},[data.id,router])



const lastMessage=useMemo(()=>{
  const messages=data.messages || [];

  return messages[messages.length-1]
},[data.messages])

const userEmail=useMemo(()=>{
  return session.data?.user?.email
},[session.data?.user?.email]);

const hasSeen=useMemo(()=>{
  if(!lastMessage) return false

  const seenArray=lastMessage.seen||[];

  if(!userEmail) return false;

  return seenArray.filter((user)=>user.email==userEmail).length!=0
},[userEmail,lastMessage]);



const lastMessageText=useMemo(()=>{
  if(lastMessage?.image) return 'Sent an Image.'

  if(lastMessage?.body) return lastMessage.body

  return "Started a conversation."
},[lastMessage]);


// const unreadCount = useMemo(() => {
//   if (!userEmail) return 0;
//   return data.messages.filter(
//     msg =>
//       msg.sender?.email !== userEmail && // message is NOT sent by current user
//       !msg.seen?.some(user => user?.email === userEmail) // and not seen yet
//   ).length;
// }, [userEmail, data.messages]);
// const hasSeen = unreadCount === 0;


  return (
    <div onClick={handleClick} className={clsx(`
    w-full relative flex items-center space-x-3 hover:bg-neutral-100
    rounded-lg transition cursor-pointer p-3
    `,selected?'bg-neutral-100':'bg-white')}>
      {data.isGroup?(
        <AvatarGroup users={data.users}/>
      ):(
<Avatar user={otherUser} />)}  
<div className='min-w-0 flex-1'>
  <div className='focus:outline-none'>
      <div className='flex justify-between
      items-center mb-1
      '>
        <p className='text-md font-medium text-gray-900'> {data.name||otherUser?.name||"Unknown user"}</p>
        {lastMessage?.createdAt && (
          <p className='text-xs text-gray-400 font-light'>
            {format(new Date(lastMessage.createdAt),'p')}
          </p>
        )}
      </div>
      <span className={clsx(
    `truncate text-sm flex items-center gap-2`,
    hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
      
        {lastMessageText}
        {!hasSeen && (
    <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" /> 
  )}
      
      </span>

      {/* <span className={clsx(
  `truncate text-sm flex items-center gap-2`,
  hasSeen ? 'text-gray-500' : 'text-black font-medium')}>
  
  {lastMessageText}
  {unreadCount > 0 && (
    <span className="text-xs text-white bg-blue-500 rounded-full px-1.5 py-0.5">
      +{unreadCount}
    </span>
  )}
</span> */}

  </div>
</div>
    </div>
  )
}

export default ConversationBox