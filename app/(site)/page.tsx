  // import Image from "next/image";
  // import AuthForm from "./components/AuthForm";


  // export default function Home() {
  //     return (
  //       <div className="
  //       flex
  //       min-h-full
  //       flex-col
  //       justify-center
  //       py-12
  //       sm:px-6
  //       lg:px-8
  //       bg-gray-200
  //       ">
  //         <div className="sm:mx-auto sm:w-full sm:max-w-md">
  //         <Image 
  //         alt="app-logo"
  //         height="88"
  //         width="88"
  //         className="mx-auto w-auto"
  //         src="/images/logo.png"
  //         />
  //         <h2
  //         className="
  //         mt-2
  //         text-center
  //         text-3xl
  //         font-bold
  //         tracking-tight
  //         text-gray-900">

  // Sign in to Your Account
  //         </h2>
  //         </div>
  //         <AuthForm/>
  //       </div>
  //     );
  //   }
    

//  'use client';

// import Image from "next/image";
// import { useState } from "react";
// import AuthForm from "./components/AuthForm";
// import { ShieldCheck, MessageCircleHeart, Images } from "lucide-react";
// import { JSX } from "react";

// export default function Home() {
//   const [showAuthForm, setShowAuthForm] = useState(false);

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="w-full bg-gradient-to-br from-purple-400 to-purple-600 text-white py-20 px-4 text-center">
//         <div className="max-w-3xl mx-auto">
//           <Image 
//             alt="app-logo"
//             height={88}
//             width={88}
//             className="mx-auto mb-4"
//             src="/images/logo.png"
//           />
//           <h1 className="text-4xl font-extrabold mb-2">
//             Welcome to <span className="text-white">ChatApp</span>
//           </h1>
//           <p className="text-lg mb-6">Connect and chat with your friends anytime, anywhere.</p>

//           {!showAuthForm ? (
//             <button
//               onClick={() => setShowAuthForm(true)}
//               className="bg-white text-purple-700 font-medium px-6 py-2 rounded-md shadow hover:bg-gray-100 transition"
//             >
//               Sign In
//             </button>
//           ) : (
//             <div className="bg-white text-gray-800 mt-6 rounded-lg shadow-lg p-6 max-w-md mx-auto">
//               <h2 className="text-2xl font-semibold mb-4">Sign in to Your Account</h2>
//               <AuthForm />
//               <div className="mt-4">
//                 <button
//                   onClick={() => setShowAuthForm(false)}
//                   className="text-sm text-purple-600 hover:underline"
//                 >
//                   ← Back to Landing
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Features Section */}
//       {!showAuthForm && (
//         <section className="w-full bg-gray-50 py-20 px-4">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//             Why Choose Us?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             <FeatureCard
//               icon={<ShieldCheck className="h-12 w-12 text-purple-600" />}
//               title="Secure Encryption"
//               desc="Your messages are encrypted to ensure complete privacy."
//             />
//             <FeatureCard
//               icon={<MessageCircleHeart className="h-12 w-12 text-pink-600" />}
//               title="Real-time Chat"
//               desc="Experience seamless real-time messaging with friends and groups."
//             />
//             <FeatureCard
//               icon={<Images className="h-12 w-12 text-blue-600" />}
//               title="Media Sharing"
//               desc="Share images, videos, and documents seamlessly within chats."
//             />
//           </div>
//           <footer className="text-center mt-16 text-sm text-gray-500">
//             Made by Surya Sharma &copy; {new Date().getFullYear()}
//           </footer>
//         </section>
//       )}
//     </div>
//   );
// }

// function FeatureCard({
//   icon,
//   title,
//   desc,
// }: {
//   icon: JSX.Element;
//   title: string;
//   desc: string;
// }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
//       <div className="flex items-center justify-center mb-4">
//         {icon}
//       </div>
//       <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
//       <p className="text-sm text-gray-600">{desc}</p>
//     </div>
//   );
// }




'use client';

import Image from "next/image";
import { useState } from "react";
import AuthForm from "./components/AuthForm";
import { ShieldCheck, MessageCircleHeart, Images } from "lucide-react";
import { JSX } from "react";

type Variant = 'LOGIN' | 'REGISTER';

export default function Home() {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [variant, setVariant] = useState<Variant>('LOGIN');

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full bg-gradient-to-br from-purple-400 to-purple-600 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <Image 
            alt="app-logo"
            height={88}
            width={88}
            className="mx-auto mb-4"
            src="/images/logo.png"
          />
          <h1 className="text-4xl font-extrabold mb-2">
            Welcome to <span className="text-white">ChatApp</span>
          </h1>
          <p className="text-lg mb-6">Connect and chat with your friends anytime, anywhere.</p>

          {!showAuthForm ? (
            <button
              onClick={() => setShowAuthForm(true)}
              className="bg-white text-purple-700 font-medium px-6 py-2 rounded-md shadow hover:bg-gray-100 transition"
            >
              Sign In
            </button>
          ) : (
            <div className="bg-white text-gray-800 mt-6 rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">
                {variant === 'LOGIN' ? 'Sign in to Your Account' : 'Register Your Account'}
              </h2>
              <AuthForm variant={variant} setVariant={setVariant} />
              <div className="mt-4">
                <button
                  onClick={() => {
                    setShowAuthForm(false);
                    setVariant('LOGIN');
                  }}
                  className="text-sm text-purple-600 hover:underline"
                >
                  ← Back to Landing
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {!showAuthForm && (
        <section className="w-full bg-gray-50 py-20 px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<ShieldCheck className="h-12 w-12 text-purple-600" />}
              title="Secure Encryption"
              desc="Your messages are encrypted to ensure complete privacy."
            />
            <FeatureCard
              icon={<MessageCircleHeart className="h-12 w-12 text-pink-600" />}
              title="Real-time Chat"
              desc="Experience seamless real-time messaging with friends and groups."
            />
            <FeatureCard
              icon={<Images className="h-12 w-12 text-blue-600" />}
              title="Media Sharing"
              desc="Share images, videos, and documents seamlessly within chats."
            />
          </div>
          <footer className="text-center mt-16 text-sm text-gray-500">
            Made by Surya Sharma &copy; {new Date().getFullYear()}
          </footer>
        </section>
      )}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: JSX.Element;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center">
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  );
}
