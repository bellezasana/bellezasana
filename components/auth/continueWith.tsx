import { useAuth } from "@/context/authContext";
import Image from "next/image";
import React from "react";

function ContinueWith() {
   const { loginWithGoogle } = useAuth();
   return (
      <div className="relative w-[90%] pt-4 my-4 border-t-2 border-t-gray-400 mx-auto">
         <p className="absolute top-0 -translate-y-[50%] left-[calc(50%-1rem)] bg-white p-2 w-fit">
            O
         </p>
         <button
            type="button"
            onClick={loginWithGoogle}
            className="flex items-center justify-center w-full p-2 border-2 rounded hover:scale-[1.005] mt-1"
         >
            <Image
               src="/icons/google.png"
               alt="Google icon"
               fill
               className="!relative mr-4 flex !h-6 !w-6  !aspect-square"
            />
            <p>Continua con Google</p>
         </button>
      </div>
   );
}

export default ContinueWith;
