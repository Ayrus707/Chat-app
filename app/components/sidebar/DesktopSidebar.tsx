// 'use client'

// import useRoutes from '@/app/hooks/useRoutes'
// import React, { useState,useEffect } from 'react'
// import DesktopItem from './DesktopItem'
// import { User } from '@/app/generated/prisma'
// import Avatar from '../Avatar'
// import SettingsModal from './SettingsModal'
// import { useTheme } from 'next-themes' // Import useTheme
// import { SunIcon, MoonIcon } from '@heroicons/react/24/solid' // Import icons

// interface DesktopSidebarProps{
//   currentUser:User
// }

// const DesktopSidebar:React.FC<DesktopSidebarProps> = ({
//   currentUser
// }) => {
//     const routes=useRoutes()
//     const[isOpen,SetIsOpen]=useState(false);
//      const { theme, setTheme } = useTheme(); // Initialize useTheme
//   const [mounted, setMounted] = useState(false); // State for hydration
//     console.log({currentUser});
//      useEffect(() => {
//     setMounted(true);
//   }, []);
//   const toggleTheme = () => {
//     if (mounted) { // Ensure this only runs client-side
//       setTheme(theme === 'dark' ? 'light' : 'dark');
//     }
//   };
//   return (
//     <>
//     <SettingsModal
//     currentuser={currentUser}
//     isOpen={isOpen}
//     onClose={()=>SetIsOpen(false)}
//     />
//     <div
//     className='hidden  lg:fixed  lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white
//     dark:lg:bg-red-800  lg:border-r-[1px] border-gray-300 dark:lg:border-gray-700  lg:pb-4 lg:flex lg:flex-col justify-between
//     '
//     >
//       <nav className='mt-4 flex flex-col justify-between'>
//     <ul role='list'
//     className='flex flex-col items-center space-y-1'
//     >
// {routes.map((item)=>(
//   <DesktopItem
//   key={item.label}
//   href={item.href}
//   label={item.label}
//   icon={item.icon}
//   active={item.active}
//   onClick={item.onClick}
//   />
// ))}
//     </ul>
//       </nav>
//       <nav className='mt-4 flex flex-col justify-between items-center'>
//         {/* Theme Toggle Button */}
//           {mounted && ( // Only render the toggle button client-side
// <button
//               onClick={toggleTheme}
//               className="
//                 p-2 
//                 rounded-md 
//                 hover:bg-gray-200 
//                 dark:hover:bg-gray-700 
//                 transition-colors 
//                 duration-200 
//                 mb-4 
//                 text-gray-500 
//                 dark:text-gray-300 // Default icon color for dark mode
//               "
//               aria-label="Toggle theme"
//             >
//               {theme === 'dark' ? (
//                 <SunIcon className="h-6 w-6 text-yellow-400" /> // Sun icon for dark theme
//               ) : (
//                 <MoonIcon className="h-6 w-6 text-gray-700" /> // Moon icon for light theme
//               )}
//             </button>
//   )}
//     <div
//     onClick={()=>SetIsOpen(true)}
//     className='cursor-pointer
//     hover:opacity-75 transition'
//     >
// <Avatar user={currentUser}/>
//     </div>
//       </nav>
//     </div>
//     </>
//   )
// }

// export default DesktopSidebar

'use client'

import useRoutes from '@/app/hooks/useRoutes'
import React, { useState } from 'react'
import DesktopItem from './DesktopItem'
import { User } from '@/app/generated/prisma'
import Avatar from '../Avatar'
import SettingsModal from './SettingsModal'
import { useThemeColor } from '@/app/context/ThemeContext';
import clsx from 'clsx'
import { IoIosColorPalette } from "react-icons/io";
import ThemeModal from './ThemeModal'
import Tooltip from '../Tooltip'

interface DesktopSidebarProps{
  currentUser:User
}

const DesktopSidebar:React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
  const { themeColor } = useThemeColor();
  const colorMap: Record<string, string> = {
      Red: 'bg-red-300',
      Orange: 'bg-orange-300',
      Yellow: 'bg-yellow-300',
      Green: 'bg-green-300',
      Purple: 'bg-purple-300',
    };
    const routes=useRoutes()
    const[isOpen,SetIsOpen]=useState(false);
    const [openModal, setOpenModal] = useState(false);
    console.log({currentUser});
    <ThemeModal isOpen={openModal} onClose={() => setOpenModal(false)} />
  return (
    <>
    <SettingsModal
    currentuser={currentUser}
    isOpen={isOpen}
    onClose={()=>SetIsOpen(false)}
    />
     <ThemeModal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    />
    <div
   className={clsx(`
  hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 
  lg:overflow-y-auto lg:border-r-[1px] border-gray-300 lg:pb-4 
  lg:flex lg:flex-col justify-between
`, colorMap[themeColor] || 'lg:bg-white')}
    >
      <nav className='mt-4 flex flex-col justify-between'>
    <ul role='list'
    className='flex flex-col items-center space-y-1'
    >
{routes.map((item)=>(
  <DesktopItem
  key={item.label}
  href={item.href}
  label={item.label}
  icon={item.icon}
  active={item.active}
  onClick={item.onClick}
  />
  
))}
<Tooltip text='Themes'>
<DesktopItem
  label="NewModal"
  href="#"
  icon={IoIosColorPalette}
  onClick={() => setOpenModal(true)}
  active={false}
/>
</Tooltip>
    </ul>
      </nav>
      <nav className='mt-4 flex flex-col justify-between items-center'>
    <div
    onClick={()=>SetIsOpen(true)}
    className='cursor-pointer
    hover:opacity-75 transition'
    >
<Tooltip text='User Profile'>
<Avatar user={currentUser}/>
</Tooltip>
    </div>
      </nav>
    </div>
    </>
  )
}

export default DesktopSidebar








