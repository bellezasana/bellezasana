import { useAuth } from "@/context/authContext";
import { useProduct } from "@/context/productContext";
import Products from "@/shared/products";
import { Product } from "@/utils/products";
import React, { useEffect } from "react";
import ProductCartHandler from "./cartHandler";
import ProductImages from "./images";
import ProductVariants from "./variants";

function ProductContent({ product }: { product: Product }) {
   const { setProduct } = useProduct();

   useEffect(() => {
      setProduct(product);
   }, [product, setProduct]);

   return (
      <div className="flex flex-col items-center w-full overflow-x-hidden ">
         <div className="flex flex-col items-center bg-white max-w-7xl">
            <div className="flex flex-col w-full py-10 lg:flex-row">
               <ProductImages product={product} />

               <div className="lg:w-[80%] p-8 ">
                  <p className="text-4xl font-semibold ">{product.title}</p>
                  <span className="flex gap-1 my-4">
                     <p>
                        {Number(product.price).toLocaleString("es-CO", {
                           style: "currency",
                           currency: "COP",
                        })}
                     </p>
                     <p>COP</p>
                  </span>
                  <ProductVariants product={product} />

                  <p
                     className="mt-8 !text-gray-700 max-h-[50vh] overflow-y-scroll"
                     dangerouslySetInnerHTML={{
                        __html: product.descriptionHTML,
                     }}
                  ></p>
                  <ProductCartHandler />
               </div>
            </div>
            <p>Te puede interesar</p>
            <Products withPagination={false} quantity={3} />
         </div>
      </div>
   );
}

export default ProductContent;
