import { useAuth } from "@/context/authContext";
import { updateQuantityOfLineItem } from "@/utils/shopifyMutations";
import { getCheckoutSession } from "@/utils/shopifyQueries";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface CartProductProps {
   product: {
      id: string;
      handle: string;
      title: string;
      description: string;
      featuredImage: {
         src: string;
      };
      variant: {
         title: string;
         id: string;
         image: {
            src: string;
         };
         product: {
            handle: string;
         };
         priceV2: {
            amount: string;
         };
      };
      // photoURL: string;
      price: number;
      quantity: number;
   };
}

function CartProduct({ product }: CartProductProps) {
   const [loading, setLoading] = useState(false);
   const { checkoutSession, setCheckoutSession, accessToken } = useAuth();
   const [productQuantity, setProductQuantity] = useState(product.quantity);

   // console.log("cartproduct", product);

   const updateQuantity = async (quantity: number) => {
      if (loading) return;
      setProductQuantity(quantity);
      setLoading(true);

      // if(quantity < 1) {
      //    await
      // }

      await updateQuantityOfLineItem(checkoutSession.id, product.id, quantity);
      const session = await getCheckoutSession(accessToken);
      setCheckoutSession(session);
      setLoading(false);
   };

   const increaseQuantity = async () => {
      await updateQuantity(product.quantity + 1);
   };
   const decreaseQuantity = async () => {
      await updateQuantity(product.quantity - 1);
   };

   return (
      <div className="relative flex flex-col items-center justify-center w-full p-2 mb-2 bg-white rounded drop-shadow lg:flex-row">
         <Link
            href={`/products/${product.variant.product?.handle}`}
            className="flex items-center justify-center w-full"
         >
            <Image
               src={product.variant.image.src}
               alt=""
               fill
               className="!relative !h-auto  !w-[7rem] !aspect-square"
            />
            <span className="w-full pl-0 lg:pl-8">
               <p className="text-sm font-semibold ">{product.title}</p>
               <p>{product.variant.title}</p>
            </span>
         </Link>
         <div className="flex items-center ">
            <span className="flex items-center px-3 ml-4 mr-2 bg-white rounded-full drop-shadow-md">
               <button
                  className={`text-2xl font-bold ${
                     loading ? "text-gray-600" : "text-blue-400"
                  }  `}
                  onClick={decreaseQuantity}
               >
                  -
               </button>
               <p className="mx-2"> {productQuantity} </p>
               <button
                  className={`text-2xl font-bold ${
                     loading ? "text-gray-600" : "text-blue-400"
                  }  `}
                  onClick={increaseQuantity}
               >
                  +
               </button>
            </span>
            <p className="text-sm">
               {Number(product.variant.priceV2.amount).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
               })}
            </p>
         </div>
      </div>
   );
}

export default CartProduct;
