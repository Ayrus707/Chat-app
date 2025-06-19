// // components/ui/Tooltip.tsx
// "use client";

// import React from "react";

// interface TooltipProps {
//   text: string;
//   children: React.ReactNode;
// }

// const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
//   return (
//     <div className="relative group inline-block">
//       {children}
//       <span className="
//         absolute bottom-full left-1/2 -translate-x-1/2 mb-2
//         opacity-0 group-hover:opacity-65 transition-opacity duration-200
//         bg-gray-800 text-white text-xs rounded px-2 py-1
//         pointer-events-none whitespace-nowrap z-10
//       ">
//         {text}
//       </span>
//     </div>
//   );
// };

// export default Tooltip;


// components/ui/Tooltip.tsx
"use client";

import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-flex items-center justify-center">
      {children}
      <span
        className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          opacity-0 group-hover:opacity-65 transition-opacity duration-200
          bg-gray-800 text-white text-xs rounded px-2 py-1
          pointer-events-none whitespace-nowrap z-10
        "
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
