import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
   product: {
      id: string;
      handle: string;
      title: string;
      description: string;
      featuredImage: {
         src: string;
      };
      // photoURL: string;
      price: number;
   };
}

function Card({ product }: CardProps) {
   // console.log(product);

   return (
      <Link
         href={`/product/${product.handle}`}
         className="relative flex flex-col w-full p-2 bg-white rounded aspect-square drop-shadow"
      >
         <span className="relative flex w-full aspect-square">
            <Image src={product.featuredImage.src} alt="" fill />
         </span>
         <p className="w-full text-sm font-semibold text-center">
            {product.title}
         </p>
      </Link>
   );
}
// w-[80vw] md:w-[40%] lg:w-[30%]
export default Card;
