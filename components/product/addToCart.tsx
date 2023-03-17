import { useAuth } from "@/context/authContext";
import { addProductToCheckout } from "@/utils/shopifyMutations";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface AddToCartProps {
   productId: string;
   quantity?: number;
}

function AddToCart({ productId, quantity = 1 }: AddToCartProps) {
   const { checkoutSession, currentUser, updateCheckoutSession } = useAuth();
   const router = useRouter();
   const [loading, setLoading] = useState(false);

   const addProduct = async () => {
      if (loading) return;
      if (!currentUser) {
         const url = `/auth/login?src=${encodeURIComponent(router.asPath)}`;
         router.push(url);
         return;
      }
      setLoading(true);

      if (!checkoutSession) {
         await updateCheckoutSession();
      }

      await addProductToCheckout(
         checkoutSession.id,
         productId,
         quantity,
         currentUser.email
      );

      await updateCheckoutSession();
      setLoading(false);
   };
   return (
      <button
         onClick={addProduct}
         className="px-8 py-2 mt-4 rounded-full bg-beige drop-shadow"
      >
         Agregar al carrito
      </button>
   );
}

export default AddToCart;
