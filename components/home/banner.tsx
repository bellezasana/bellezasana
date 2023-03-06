import Image from "next/image";
import React from "react";

function Banner() {
   return (
      <div className="flex items-center justify-center w-full my-14">
         <div className="max-w-3xl p-8 bg-white drop-shadow-md">
            <Image
               src="/BellezaSanaBannerCropped.png"
               alt=""
               fill
               className="!relative w-full"
            />

            <p className="mt-2 text-xl font-bold text-center">
               BELLA POR DENTRO Y POR FUERA
            </p>
         </div>
      </div>
   );
}

export default Banner;
