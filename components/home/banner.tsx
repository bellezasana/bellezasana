import Image from "next/image";
import React from "react";

function Banner() {
   return (
      <div className="flex items-center justify-center w-full mb-14">
         <Image
            src="/BellezaSanaCover.png"
            alt=""
            fill
            className="!relative max-w-4xl mt-16 drop-shadow-md"
         />
      </div>
   );
}

export default Banner;
