import { Product } from "@/utils/products";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Card({ product }: { product: Product }) {
   const [imgIndex, setImgIndex] = useState(0);
   const [onHover, setOnHover] = useState(false);
   const handleHoverStart = () => {
      setOnHover(true);
      if (!product.images[1]) return;
      setImgIndex(1);
   };
   const handleHoverEnd = () => {
      setOnHover(false);
      setImgIndex(0);
   };

   return (
      <Link
         href={`/products/${product.handle}`}
         className="relative flex flex-col w-full p-2 text-sm bg-white rounded hover:drop-shadow"
         onMouseEnter={handleHoverStart}
         onMouseLeave={handleHoverEnd}
         onTouchStart={handleHoverStart}
         onTouchEnd={handleHoverEnd}
      >
         <span className="!aspect-square overflow-hidden">
            <Image
               src={product.images[imgIndex]}
               alt=""
               fill
               className="!relative !h-full !w-auto mx-auto hover:scale-[1.025] duration-200"
            />
         </span>

         <p
            className={`${
               onHover && "underline"
            } w-full font-semibold capitalize mt-auto`}
         >
            {product.title}
         </p>
         <p>
            {Number(product.price).toLocaleString("es-CO", {
               style: "currency",
               currency: "COP",
            })}
         </p>
      </Link>
   );
}
export default Card;
