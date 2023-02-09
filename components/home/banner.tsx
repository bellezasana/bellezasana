import Image from "next/image";
import React from "react";

function Banner() {
   return (
      <div className="w-full h-[100vh] flex justify-center items-center">
         <div className="bg-white drop-shadow-md p-8">
            <span className="relative flex aspect-[24/9] w-[80vw] max-w-sm">
               <Image src="/BellezaSanaBannerCropped.png" alt="" fill />
            </span>
            <p className="font-bold text-xl text-center mt-2">
               BELLA POR DENTRO Y POR FUERA
            </p>
         </div>
      </div>
   );
}

export default Banner;
