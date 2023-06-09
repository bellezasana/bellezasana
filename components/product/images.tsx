import { useProduct } from "@/context/productContext";
import { Product } from "@/utils/products";
import Image from "next/image";
import React, { useEffect } from "react";

function ProductImages({ product }: { product: Product }) {
   const { image, setImage } = useProduct();

   return (
      <div className="flex flex-col items-center w-full">
         <span className="h-[40vw] !aspect-square ">
            <Image
               src={image || product.featuredImage}
               alt=""
               fill
               className="!relative h-full !w-auto mx-auto "
            />
         </span>
         <span className="flex flex-wrap justify-center w-full">
            {product.images.length > 1 &&
               product.images.map((image) => (
                  <Image
                     onMouseEnter={() => setImage(image)}
                     onTouchStart={() => setImage(image)}
                     key={image}
                     src={image}
                     fill
                     className="!relative !h-[13vw] !w-[13vw] lg:!h-[5vw] lg:!w-[5vw]"
                     alt=""
                  />
               ))}
         </span>
      </div>
   );
}

export default ProductImages;
