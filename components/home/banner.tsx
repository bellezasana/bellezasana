import Image from "next/image";
import React from "react";

function Banner() {
   return (
      <div className="flex items-center justify-center w-full min-h-[100vh] my-14">
         <div className="p-8 bg-white drop-shadow-md">
            <span className="relative flex aspect-[24/9] w-full max-w-sm">
               <Image src="/BellezaSanaBannerCropped.png" alt="" fill />
            </span>
            <p className="mt-2 text-xl font-bold text-center">
               BELLA POR DENTRO Y POR FUERA
            </p>
         </div>
      </div>
   );
}

export default Banner;
