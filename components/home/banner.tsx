import Image from "next/image";
import React from "react";

function Banner() {
   return (
      <div className="flex items-center justify-center w-full my-14">
         <Image
            src="/BellezaSanaCover.png"
            alt=""
            fill
            className="!relative w-full !max-w-3xl drop-shadow-md"
         />
      </div>
   );
}

export default Banner;
