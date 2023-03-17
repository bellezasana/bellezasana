import { Product } from "@/utils/products";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Card({ product }: { product: Product }) {
   // console.log(product);

   return (
      <Link
         href={`/products/${product.handle}`}
         className="relative flex flex-col w-full p-2 bg-white rounded drop-shadow"
      >
         <Image src={product.images[0]} alt="" fill className="!relative" />

         <p className="w-full text-sm font-semibold text-center capitalize">
            {product.title}
         </p>
      </Link>
   );
}
export default Card;
