import { useAuth } from "@/context/authContext";
import { updateQuantityOfLineItem } from "@/utils/shopifyMutations";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddToCart from "./addToCart";

function ProductContent({ product }: any) {
   const [showButton, setShowButton] = useState(true);
   const { checkoutSession, currentUser, updateCheckoutSession } = useAuth();
   const [productQuantity, setProductQuantity] = useState(
      checkoutSession?.lineItems.edges[0]?.node.quantity || 1
   );
   const [loading, setLoading] = useState(false);
   const [productId, setProductId] = useState("");

   useEffect(() => {
      if (!checkoutSession) return;

      const lineItems = checkoutSession.lineItems.edges.map(
         (item: any) => item.node
      );

      const variantId = product.variants.edges[0]?.node.id;

      if (!lineItems || !variantId) return;

      let item = lineItems.find((item: any) => item.variant.id === variantId);

      if (item) {
         setShowButton(false);
         setProductId(item.id);
         setProductQuantity(item.quantity);
         return;
      }
      setShowButton(true);
      // console.log(checkoutSession);
   }, [checkoutSession, product]);

   // console.log(product);
   const updateQuantity = async (quantity: number) => {
      if (loading) return;
      if (!productId || productId === "") return;
      setProductQuantity(quantity);
      setLoading(true);

      await updateQuantityOfLineItem(checkoutSession.id, productId, quantity);
      await updateCheckoutSession();
      setLoading(false);
   };

   const increaseQuantity = async () => {
      await updateQuantity(productQuantity + 1);
   };
   const decreaseQuantity = async () => {
      await updateQuantity(productQuantity - 1);
   };
   return (
      <div className="flex flex-col items-center w-full overflow-x-hidden ">
         <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto bg-white lg:flex-row">
            <Image
               src={product.featuredImage.url || ""}
               alt=""
               fill
               className="!relative !w-[50%] !h-auto  !aspect-square "
            />

            <div className="w-full p-8">
               <p className="text-xl font-semibold ">{product.title}</p>
               <span className="flex gap-1">
                  <p>
                     {Number(
                        product.priceRange.maxVariantPrice.amount
                     ).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                     })}
                  </p>
                  <p>{product.priceRange.maxVariantPrice.currencyCode}</p>
               </span>
               <p className="mt-8 text-[.8rem] max-h-[50vh] overflow-y-scroll">
                  {product.description}
               </p>
               {showButton ? (
                  <AddToCart productId={product.variants.edges[0]?.node.id} />
               ) : (
                  <div className="flex items-center mt-4">
                     <span className="flex items-center px-3 ml-4 mr-2 bg-white rounded drop-shadow-md w-fit">
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
                     <button
                        onClick={async () => await updateQuantity(0)}
                        className="px-3 py-1 rounded bg-beige"
                     >
                        Quitar del carrito
                     </button>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default ProductContent;
