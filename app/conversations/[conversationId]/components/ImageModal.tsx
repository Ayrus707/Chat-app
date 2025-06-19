// "use client"
// import Modal from '@/app/components/Modal';
// import Image from 'next/image';
// import React from 'react'

// interface ImageModalProps{
//     isOpen?:boolean;
//     onClose:()=>void;
//     src?:string |null;
// }
// const ImageModal:React.FC<ImageModalProps> = ({
//     isOpen,onClose,src
// }) => {
//     if(!src) return null;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}    >
//         <div className='w-80 h-80 '>
//         <Image alt="Image" className='object-cover' fill src={src}/>
//         </div>
//     </Modal>
//   )
// }

// export default ImageModal


// "use client";
// import Modal from '@/app/components/Modal';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';

// interface ImageModalProps {
//   isOpen?: boolean;
//   onClose: () => void;
//   src?: string | null;
// }

// const isVideo = (src: string) => {
//   return src.match(/\.(mp4|webm|ogg)$/i);
// };

// const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
//   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     if (!src || isVideo(src)) return;

//     const img = new window.Image();
//     img.src = src;
//     img.onload = () => {
//       const maxWidth = 600;
//       const maxHeight = 600;
//       let width = img.width;
//       let height = img.height;

//       // Scale down proportionally if image is too large
//       if (width > maxWidth || height > maxHeight) {
//         const widthRatio = maxWidth / width;
//         const heightRatio = maxHeight / height;
//         const ratio = Math.min(widthRatio, heightRatio);
//         width = Math.round(width * ratio);
//         height = Math.round(height * ratio);
//       }

//       setDimensions({ width, height });
//     };
//   }, [src]);

//   if (!src) return null;

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="flex items-center justify-center p-4">
//         {isVideo(src) ? (
//           <video
//             controls
//             src={src}
//             className="max-w-full max-h-[600px] rounded-md"
//           />
//         ) : (
//           <Image
//             alt="Media Preview"
//             src={src}
//             width={dimensions.width || 300}
//             height={dimensions.height || 300}
//             className="rounded-md"
//           />
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default ImageModal;


"use client";
import Modal from "@/app/components/Modal";
import Image from "next/image";
import React from "react";
import { useThemeColor } from "@/app/context/ThemeContext";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const isVideo = (src: string) => {
  return src.match(/\.(mp4|webm|ogg)$/i);
};

// Cloudinary force-download: insert "fl_attachment" in URL
const getDownloadURL = (url: string) => {
  if (!url.includes("/upload/")) return url;
  return url.replace("/upload/", "/upload/fl_attachment/");
};

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  src
}) => {
  const { themeColor } = useThemeColor();
  if (!src) return null;

  const bgColorMap: Record<string, string> = {
    Red: "bg-red-100",
    Orange: "bg-orange-100",
    Yellow: "bg-yellow-100",
    Green: "bg-green-100",
    Purple: "bg-purple-100",
    Blue: "bg-blue-100",
  };

  const downloadUrl = getDownloadURL(src);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={`w-[90vw] max-w-md max-h-[90vh] p-4 rounded-lg relative flex flex-col items-center  bg-white
        }`}
      >
        <div className="max-w-full max-h-[60vh] flex items-center justify-center relative">
          {isVideo(src) ? (
            <video
              controls
              className="max-w-full max-h-[60vh] rounded-md"
              src={src}
            />
          ) : (
            <Image
              alt="Media Preview"
              src={src}
              width={500}
              height={500}
              className="rounded-md max-w-full max-h-[60vh] object-contain"
            />
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <a
  href={downloadUrl}
   target="_blank" 
   rel="noopener noreferrer" 
  download
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
>
  <ArrowDownTrayIcon className="h-5 w-5 text-white" />
  Download
</a>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-full text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
