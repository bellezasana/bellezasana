import Image from "next/image";
import React from "react";

function Banner() {
   return (
      <div className="flex items-center justify-center w-full py-0 git">
         <Image
            src="/newSvg.svg"
            alt=""
            fill
            className="!relative !w-full !h-auto  drop-shadow-md"
         />
      </div>
   );
}

export default Banner;
