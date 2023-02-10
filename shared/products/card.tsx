import Image from "next/image";
import React from "react";

interface CardProps {
   product: {
      id: string;
      name: string;
      description: string;
      photoURL: string;
      price: number;
   };
}

function Card({ product }: CardProps) {
   return (
      <div className="relative flex aspect-square w-[80vw] sm:w-[45vw] md:w-[20vw] m-2">
         <span className="relative flex w-full aspect-square">
            <Image src={product.photoURL} alt="" fill />
         </span>
         <p className="absolute w-full font-bold text-center bottom-4">
            {product.name}
         </p>
      </div>
   );
}

export default Card;
