import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import CartDropdown from "./cartDropdown";
import { useNav } from "@/context/navContext";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { shopifyAPI } from "@/utils/shopifyAPI";
import {
   checkoutQuery,
   customerQuery,
   getCheckoutSession,
} from "@/utils/shopifyQueries";
import Link from "next/link";

function ShoppingCart() {
   const { currentUser, accessToken, setCheckoutSession, checkoutSession } =
      useAuth();

   useEffect(() => {
      const loadCheckoutSession = async () => {
         const session = await getCheckoutSession(accessToken);
         setCheckoutSession(session);
      };
      loadCheckoutSession();
   }, [accessToken, setCheckoutSession]);

   return (
      <div className="relative flex h-12 !aspect-square mx-1">
         <Link
            href="/cart"
            className="flex items-center justify-center !min-h-full  bg-white rounded-full cursor-pointer !aspect-square drop-shadow-md hover:drop-shadow-lg "
         >
            <ShoppingCartIcon className="flex text-gray-700" />
         </Link>
         {currentUser && checkoutSession?.lineItems?.edges.length > 0 && (
            <p className="absolute -bottom-1 -right-1 flex items-center justify-center p-1 text-[.6rem] text-white bg-red-600 rounded-full !aspect-square !w-5  !h-5">
               {checkoutSession?.lineItems?.length > 9
                  ? "9+"
                  : checkoutSession?.lineItems?.edges.length || 0}
            </p>
         )}
      </div>
   );
}

export default ShoppingCart;
