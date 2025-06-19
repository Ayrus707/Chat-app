// "use client"
// import Avatar from '@/app/components/Avatar'
// import { FullMessageType } from '@/app/types'
// import clsx from 'clsx'
// import { getSession, useSession } from 'next-auth/react'
// import { format } from 'date-fns'
// import React, { useState } from 'react'
// import Image from 'next/image'
// import ImageModal from './ImageModal'
// import { decryptMessage } from '@/app/libs/crypto';
// import { useThemeColor } from '@/app/context/ThemeContext'; // adjust path as needed
// import { FaPlayCircle } from 'react-icons/fa';
// import { HiDocumentText } from "react-icons/hi";
// import Tooltip from '@/app/components/Tooltip'
// import { TbLanguageHiragana } from "react-icons/tb"; 

// interface MessageBoxProps{
//    data:FullMessageType,
//    isLast?:boolean,
// };

// const MessageBox:React.FC<MessageBoxProps> = ({
//     data,isLast
// }) => {

// const [translatedText, setTranslatedText] = useState('');
// const [showTranslation, setShowTranslation] = useState(false);
// const [translating, setTranslating] = useState(false);

// const handleTranslate = async () => {
//   try {
//     setTranslating(true);
//     const res = await fetch('https://libretranslate.de/translate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         q: decryptedBody,
//         source: 'en',
//         target: 'hi', // target: Hindi
//         format: 'text'
//       })
//     });
//     const data = await res.json();
//     setTranslatedText(data.translatedText);
//     setShowTranslation(true);
//   } catch (error) {
//     console.error("Translation failed", error);
//   } finally {
//     setTranslating(false);
//   }
// };


// function linkify(text: string) {
//   const urlRegex = /((https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\S*)?)/gi;

//   const elements: React.ReactNode[] = [];
//   let lastIndex = 0;

//   for (const match of text.matchAll(urlRegex)) {
//     const url = match[0];
//     const index = match.index ?? 0;

//     // Push text before the link
//     if (index > lastIndex) {
//       elements.push(text.slice(lastIndex, index));
//     }

//     // Normalize the URL
//     const safeUrl = url.startsWith('http') ? url : `https://${url}`;

//     // Push the link
//     elements.push(
//       <a
//         key={index}
//         href={safeUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-gray-700 underline break-all font-bold"
//       >
//         {url}
//       </a>
//     );

//     lastIndex = index + url.length;
//   }

//   // Push the remaining text
//   if (lastIndex < text.length) {
//     elements.push(text.slice(lastIndex));
//   }

//   return elements;
// }





//     const { themeColor } = useThemeColor();
//     const colorMap: Record<string, string> = {
//         Red: 'bg-red-500 hover:bg-red-600',
//         Orange: 'bg-orange-500 hover:bg-orange-600',
//         Yellow: 'bg-yellow-500 hover:bg-yellow-600',
//         Green: 'bg-green-500 hover:bg-green-600',
//         Purple: 'bg-purple-500 hover:bg-purple-600',
//       };

//       const bgMap: Record<string, string> = {
//   Red: 'bg-red-500',
//   Orange: 'bg-orange-500',
//   Yellow: 'bg-yellow-400',
//   Green: 'bg-green-500',
//   Purple: 'bg-purple-500',
// };


//     const session=useSession();
//     const [imageModalOpen,setImageModalOpen]=useState(false);
//    let decryptedBody = '';
// try {
//   decryptedBody = data.body ? decryptMessage(data.body) : '';
//   console.log("Encrypted from DB:", data.body);
//   console.log("Decrypted output:", decryptedBody);
// } catch (err) {
//   console.error("Failed to decrypt message", err);
//   decryptedBody = data.body ?? ''; // fallback to raw string or empty string
// }
//     const isOwn=session?.data?.user?.email==data?.sender?.email
//     const seenList=(data.seen||[]).filter((user)=>user.email!=data?.sender?.email).map((user)=>user.name)
//     .join(', ');

//     const container=clsx(
//         "flex gap-3 p-4 ", isOwn && "justify-end"
//     );

//     const avatar=clsx(isOwn && "order-2");

//     const body=clsx("flex flex-col  gap-2 ",isOwn&& "items-end")

//     // const message=clsx("text-sm w-fit  oveflow-hidden",isOwn ?"bg-sky-500 text-white" :'bg-gray-100',
//     //     data.image? "rounded-md p-0" :"rounded-full py-2 px-3" 
//     // );
// const message = clsx(
//   "text-sm w-fit overflow-hidden",
//   isOwn ? `${colorMap[themeColor] || 'bg-blue-500'} text-white` : 'bg-gray-100',
//   data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
// );

//   return (
//     <div className={container}>
//         <div className={avatar}>
//             <Avatar user={data.sender||{ name: 'Deleted user', image: null }}/>
//         </div>
//         <div className={body}>
//             <div className='flex items-center gap-1 '>
//                 <div className='text-sm text-gray-500'>
//                     {data.sender.name||'Unknown User'}
//                 </div>
//                 <div className='text-xs text-gray-400'>
//                     {format(new Date(data.createdAt),'p')}
//                 </div>
//             </div>
//             <div className={message}>
//                 <ImageModal src={data.image} isOpen={imageModalOpen}
//                 onClose={()=>setImageModalOpen(false)}
//                 />
//                 {/* {data.image?(
//                     <Image  onClick= {()=>setImageModalOpen(true)}alt="image" height="288" width="288"
//                     src={data.image}
//                     className='object-cover cursor-pointer hover:scale-105 transition translate'
//                     />
//                 ):(<div>
//                         {data.body}
//                 </div>
//             )} */}

//             {/* {data.image ? (
//   <Image onClick={() => setImageModalOpen(true)} alt="image" height="288" width="288"
//     src={data.image}
//     className='object-cover cursor-pointer hover:scale-105 transition translate'
//   />
// ) : (
//   <div>
//     {decryptedBody}
//   </div>
// )} */}

// {data.image ? (
//   data.image.match(/\.(mp4|webm|ogg)$/i) ? (
//     <div
//       onClick={() => setImageModalOpen(true)}
//       className={`w-72 h-40 flex flex-col items-center justify-center rounded-md cursor-pointer hover:scale-105 transition ${bgMap[themeColor] || 'bg-blue-500'}`}
//     >
//       <FaPlayCircle className="text-white text-5xl" />
//        <div className="mt-2 text-white text-sm">Click to play</div>
      
//     </div>
//   ) : 
  
//   data.image.match(/\.(pdf|docx?|txt)$/i) ? (
//     // Handle document
//     <div
//       onClick={() => window.open(data.image!, "_blank")}
//       className={`w-48 h-32 flex flex-col items-center justify-center rounded-md cursor-pointer hover:scale-105 transition ${bgMap[themeColor] || 'bg-blue-500'}`}
//     >
//       <HiDocumentText className="text-white text-5xl" />
//       <div className="mt-2 text-white text-sm text-center px-2">
//         View Document
//       </div>
//       <div className="text-xs text-white mt-1">
//      [{`.` + data.image?.split('.').pop()?.split('?')[0].toLowerCase()}]
//     </div>
//     </div>
//   ):

//   (
//     <Image
//       onClick={() => setImageModalOpen(true)}
//       alt="image"
//       height={288}
//       width={288}
//       src={data.image}
//         unoptimized
//       className="object-cover cursor-pointer hover:scale-105 transition rounded-md"
//     />
//   )
// ) : (
// <div className="whitespace-pre-wrap break-words">
//   {linkify(decryptedBody)}
// </div>
// )}


//             </div>
//             {isLast && isOwn && seenList.length>0 && (
//                 <div className='text-xs font-light text-gray-500'>{`Seen by ${seenList}`}</div>
//             )}
//         </div>
//     </div>
//   )
// }

// export default MessageBox






"use client"
import Avatar from '@/app/components/Avatar'
import { FullMessageType } from '@/app/types'
import clsx from 'clsx'
import { getSession, useSession } from 'next-auth/react'
import { format } from 'date-fns'
import React, { useState } from 'react'
import Image from 'next/image'
import ImageModal from './ImageModal'
import { decryptMessage } from '@/app/libs/crypto';
import { useThemeColor } from '@/app/context/ThemeContext'; // adjust path as needed
import { FaPlayCircle } from 'react-icons/fa';
import { HiDocumentText } from "react-icons/hi";
import Tooltip from '@/app/components/Tooltip'
import { TbLanguageHiragana } from "react-icons/tb"; 

interface MessageBoxProps{
   data:FullMessageType,
   isLast?:boolean,
};

const MessageBox:React.FC<MessageBoxProps> = ({
    data,isLast
}) => {

const [translatedText, setTranslatedText] = useState('');
const [showTranslation, setShowTranslation] = useState(false);
const [translating, setTranslating] = useState(false);




const handleTranslate = async () => {
  try {
    setTranslating(true);
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: decryptedBody }) 
    });

    const data = await res.json();
    // console.log("OpenAI response:", data);

    if (data.error) {
      // console.error("Translation API error:", data.error);
      setTranslatedText('[Translation error]');
    } else {
      setTranslatedText(data.translatedText);
      setShowTranslation(true);
    }
  } catch (error) {
    // console.error("Translation failed:", error);
    setTranslatedText('[Translation failed]');
  } finally {
    setTranslating(false);
  }
};



function linkify(text: string) {
  const urlRegex = /((https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\S*)?)/gi;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(urlRegex)) {
    const url = match[0];
    const index = match.index ?? 0;

    // Push text before the link
    if (index > lastIndex) {
      elements.push(text.slice(lastIndex, index));
    }

    // Normalize the URL
    const safeUrl = url.startsWith('http') ? url : `https://${url}`;

    // Push the link
    elements.push(
      <a
        key={index}
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 underline break-all font-bold"
      >
        {url}
      </a>
    );

    lastIndex = index + url.length;
  }

  // Push the remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}





    const { themeColor } = useThemeColor();
    const colorMap: Record<string, string> = {
        Red: 'bg-red-500 hover:bg-red-600',
        Orange: 'bg-orange-500 hover:bg-orange-600',
        Yellow: 'bg-yellow-500 hover:bg-yellow-600',
        Green: 'bg-green-500 hover:bg-green-600',
        Purple: 'bg-purple-500 hover:bg-purple-600',
      };

      const bgMap: Record<string, string> = {
  Red: 'bg-red-500',
  Orange: 'bg-orange-500',
  Yellow: 'bg-yellow-400',
  Green: 'bg-green-500',
  Purple: 'bg-purple-500',
};

const textColorMap: Record<string, string> = {
  Red: 'text-red-500',
  Orange: 'text-orange-500',
  Yellow: 'text-yellow-400',
  Green: 'text-green-500',
  Purple: 'text-purple-500',
};

      const borderMap: Record<string, string> = {
  Red: 'border-red-500',
  Orange: 'border-orange-500',
  Yellow: 'border-yellow-400',
  Green: 'border-green-500',
  Purple: 'border-purple-500',
};


    const session=useSession();
    const [imageModalOpen,setImageModalOpen]=useState(false);
   let decryptedBody = '';
try {
  decryptedBody = data.body ? decryptMessage(data.body) : '';
  console.log("Encrypted from DB:", data.body);
  console.log("Decrypted output:", decryptedBody);
} catch (err) {
  console.error("Failed to decrypt message", err);
  decryptedBody = data.body ?? ''; // fallback to raw string or empty string
}
    const isOwn=session?.data?.user?.email==data?.sender?.email
    const seenList=(data.seen||[]).filter((user)=>user.email!=data?.sender?.email).map((user)=>user.name)
    .join(', ');

    const container=clsx(
        "flex gap-3 p-4 ", isOwn && "justify-end"
    );

    const avatar=clsx(isOwn && "order-2");

    const body=clsx("flex flex-col  gap-2 ",isOwn&& "items-end")

    // const message=clsx("text-sm w-fit  oveflow-hidden",isOwn ?"bg-sky-500 text-white" :'bg-gray-100',
    //     data.image? "rounded-md p-0" :"rounded-full py-2 px-3" 
    // );
const message = clsx(
  "text-sm w-fit overflow-hidden",
  isOwn ? `${colorMap[themeColor] || 'bg-blue-500'} text-white` : 'bg-gray-100',
  data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
);

  return (
    <div className={container}>
        <div className={avatar}>
            <Avatar user={data.sender||{ name: 'Deleted user', image: null }}/>
        </div>
        <div className={body}>
            <div className='flex items-center gap-1 '>
                <div className='text-sm text-gray-500'>
                    {data.sender.name||'Unknown User'}
                </div>
                <div className='text-xs text-gray-400'>
                    {format(new Date(data.createdAt),'p')}
                </div>
            </div>
           {/* Entire message + translate button container */}
<div className="flex items-center">
  <div className={message}>
    <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />

 {data.image ? (
                        data.image.match(/\.(mp4|webm|ogg)$/i) ? (
                            <div
                                onClick={() => setImageModalOpen(true)}
                                className={`w-72 h-40 flex flex-col items-center justify-center rounded-md cursor-pointer hover:scale-105 transition ${bgMap[themeColor] || 'bg-blue-500'}`}
                            >
                                <FaPlayCircle className="text-white text-5xl" />
                                <div className="mt-2 text-white text-sm">Click to play</div>
                            </div>
                        ) : 
                        data.image.match(/\.(pdf|docx?|txt)$/i) ? (
                            <div
                                onClick={() => window.open(data.image!, "_blank")}
                                className={`w-48 h-32 flex flex-col items-center justify-center rounded-md border-2 ${borderMap[themeColor] || 'border-blue-500'} cursor-pointer hover:scale-105 transition bg-white shadow-sm`}
                            >
                               <HiDocumentText className={`text-5xl ${textColorMap[themeColor] || 'text-blue-500'}`} />
                                <div className="mt-2 text-black text-sm text-center px-2">
                                    View Document
                                </div>
                                <div className="text-xs text-black mt-1">
                                    [{`.` + data.image?.split('.').pop()?.split('?')[0].toLowerCase()}]
                                </div>
                            </div>
                        ) : 
                        (
                            <Image
                                onClick={() => setImageModalOpen(true)}
                                alt="image"
                                height={288}
                                width={288}
                                src={data.image}
                                unoptimized
                                className="object-cover cursor-pointer hover:scale-105 transition rounded-md"
                            />
                        )
                    ) : (
                        <div className="whitespace-pre-wrap break-words">
                            {linkify(decryptedBody)}
                        </div>
                    )}
                </div>

                {/* Translate Button (only for text messages)//commmment this out to remove translate button! */}
                {!data.image && !showTranslation && decryptedBody && (
                    <Tooltip text="Translate to Hindi">
                        <button
                            onClick={handleTranslate}
                            disabled={translating}
                            className="ml-2 text-gray-500 hover:text-blue-500 self-center" // Use self-center for vertical alignment
                        >
                            <TbLanguageHiragana size={18} />
                        </button>
                    </Tooltip>
                )}
            </div>

            {/* Translated Text Below */}
            {!data.image && showTranslation && (
                <div className="mt-2 text-xs text-gray-600 italic bg-gray-100 px-2 py-1 rounded">
                    {translatedText}
                </div>
            )}
</div>

            {isLast && isOwn && seenList.length>0 && (
                <div className='text-xs font-light text-gray-500'>{`Seen by ${seenList}`}</div>
            )}
        </div>
  
  )
}

export default MessageBox