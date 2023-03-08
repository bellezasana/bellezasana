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
         href={`/products/${product.handle}`}
         className="relative flex flex-col w-full p-2 bg-white rounded drop-shadow"
      >
         <Image
            src={product.featuredImage.src}
            alt=""
            fill
            className="!relative"
         />

         <p className="w-full text-sm font-semibold text-center capitalize">
            {product.title}
         </p>
      </Link>
   );
}
export default Card;
