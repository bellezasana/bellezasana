import { useProduct } from "@/context/productContext";
import { Product } from "@/utils/products";
import { useRouter } from "next/router";
import React from "react";
import { getProductVariant } from "./cartHandler";

function ProductVariants({ product }: { product: Product }) {
   const { selectedVariant, setSelectedVariant, setImage } = useProduct();
   const router = useRouter();
   return (
      <span className="flex flex-wrap mt-2">
         {product.variants.length > 1 &&
            product.variants.map((variant) => {
               let bg = "";

               let id = getProductVariant(variant.id);
               if (id === selectedVariant) {
                  bg = "bg-beige";
               }
               return (
                  <button
                     onClick={() => {
                        setSelectedVariant(id);
                        setImage(variant.image.src);

                        router.replace(
                           `/products/${
                              product.handle
                           }?variant=${encodeURIComponent(id)}`
                        );
                     }}
                     key={variant.id}
                     className={`${bg} rounded-full px-4 py-1 text-sm whitespace-nowrap `}
                  >
                     {variant.title}
                  </button>
               );
            })}
      </span>
   );
}

export default ProductVariants;
