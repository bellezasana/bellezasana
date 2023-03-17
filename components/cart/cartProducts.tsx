import { useAuth } from "@/context/authContext";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CartProduct from "./cartProduct";

function CartProducts({ products }: any) {
   const { checkoutSession } = useAuth();

   // useEffect(() => {
   //    console.log(checkoutSession);
   // }, [checkoutSession]);

   return (
      <div className="flex flex-col items-center justify-center w-full max-w-4xl px-2 mt-2">
         {products.map((product: any) => (
            <CartProduct key={product.id} product={product} />
         ))}
         <div className="flex justify-end w-full mt-8">
            <p>
               Subtotal:{" "}
               {parseFloat(
                  checkoutSession.subtotalPriceV2.amount
               ).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
               })}{" "}
               COP
            </p>
         </div>
         <div className="flex justify-end w-full">
            <a
               href={checkoutSession.webUrl}
               target="_blank"
               rel="noreferrer"
               className="px-4 py-2 mt-4 text-white rounded bg-green-dark"
            >
               Continuar compra
            </a>
         </div>
      </div>
   );
}

export default CartProducts;
