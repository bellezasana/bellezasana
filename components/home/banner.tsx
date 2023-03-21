import Image from "next/image";
import React from "react";

function Banner() {
   return (
      <div className="flex items-center justify-center w-full py-0 bg-cover">
         <Image
            src="/NewSvg.svg"
            alt=""
            fill
            className="!relative !w-full !h-auto  drop-shadow-md"
         />
      </div>
   );
}

export default Banner;
