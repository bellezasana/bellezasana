import { useAuth } from "@/context/authContext";
import { useProduct } from "@/context/productContext";
import { updateQuantityOfLineItem } from "@/utils/shopifyMutations";
import React, { useState, useEffect } from "react";

function ProductQuantity({ item }: { item: any }) {
   const { checkoutSession, updateCheckoutSession } = useAuth();
   const [loading, setLoading] = useState(false);
   const [productQuantity, setProductQuantity] = useState(item?.quantity || 1);
   const { selectedVariant } = useProduct();

   useEffect(() => {
      setProductQuantity(item?.quantity || 1);
   }, [item]);

   const updateQuantity = async (quantity: number) => {
      if (loading) return;
      if (!selectedVariant || selectedVariant === "") return;
      const variantID = item.id;
      setProductQuantity(quantity);
      setLoading(true);

      await updateQuantityOfLineItem(checkoutSession.id, variantID, quantity);
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
      <div className="flex items-center mt-4">
         <span className="flex items-center px-4 py-1 mr-2 bg-white rounded-full drop-shadow-md w-fit">
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
            className="px-4 py-2 rounded-full bg-beige whitespace-nowrap"
         >
            Quitar del carrito
         </button>
      </div>
   );
}

export default ProductQuantity;
