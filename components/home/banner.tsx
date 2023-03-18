import Image from "next/image";
import React from "react";

function Banner() {
   return (
      <div className="flex items-center justify-center w-full py-16 px-8 bg-[url(/BanerBg.png)] bg-cover">
         <Image
            src="/BellezaSanaCover.png"
            alt=""
            fill
            className="!relative !w-full !h-auto max-w-3xl drop-shadow-md"
         />
      </div>
   );
}

export default Banner;
