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
      <div className="relative flex aspect-square w-[20rem] m-2">
         <span className="relative aspect-square w-full flex">
            <Image src={product.photoURL} alt="" fill />
         </span>
         <p className="font-bold absolute bottom-4 w-full text-center">
            {product.name}
         </p>
      </div>
   );
}

export default Card;
