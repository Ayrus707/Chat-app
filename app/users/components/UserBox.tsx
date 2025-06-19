import Avatar from '@/app/components/Avatar'
import LoadingModal from '@/app/components/LoadingModal'
import { User } from '@/app/generated/prisma'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useThemeColor } from '@/app/context/ThemeContext';
import clsx from 'clsx'
interface UserBoxProps{
    data:User
}
const UserBox:React.FC<UserBoxProps> = ({
    data
}) => {
  const { themeColor } = useThemeColor();
   const colorMap: Record<string, string> = {
      Red: 'hover:bg-red-100',
      Orange: 'hover:bg-orange-100',
      Yellow: 'hover:bg-yellow-100',
      Green: 'hover:bg-green-100',
      Purple: 'hover:bg-purple-100',
    };
    const router=useRouter();
    const [isLoading,SetIsLoading]=useState(false);

    const handleClick=useCallback(()=>{
      SetIsLoading(true) 
      
      axios.post('/api/conversations',{
        userID:data.id
      })
      .then((data)=>{
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(()=>SetIsLoading(false))
    },[data,router])
  return (
    <>
    {isLoading &&(
    <LoadingModal/>  )}
      <div onClick={handleClick}
      
      className={clsx(
    'w-full relative flex items-center space-x-3 bg-white p-3 rounded-lg transition cursor-pointer',
    colorMap[themeColor] || 'hover:bg-neutral-100'
  )}
    >
     <Avatar user={data}/>
     <div className='min-w-0 flex-1 '>
        <div className='focus:outline-none'>
        <div className=' flex justify-between items-center mb-1'>
        <p className='text-sm font-medium text-gray-900'>{data.name}</p>
        </div>
        </div>
     </div>
      </div>
    
    </>
  )
}

export default UserBox