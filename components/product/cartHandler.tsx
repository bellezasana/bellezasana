import { useAuth } from "@/context/authContext";
import { useProduct } from "@/context/productContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddToCart from "./addToCart";
import ProductQuantity from "./quantity";

export const getProductVariant = (variantId: string) => {
   let query = "ProductVariant/";
   let index = variantId.indexOf(query);
   let selected = "";
   if (index !== -1) {
      selected = variantId.slice(index + query.length);
   }
   return selected;
};

function ProductCartHandler() {
   const { showButton, setShowButton, setSelectedVariant, product } =
      useProduct();

   const { checkoutSession } = useAuth();
   const router = useRouter();
   const [lineItem, setLineItem] = useState<any>();
   const [variantId, setVariantId] = useState("");
   useEffect(() => {
      if (!product) return;
      const { variant } = router.query;
      let selected: string;
      if (variant) {
         selected = variant as string;
         // console.log(selected);

         setSelectedVariant(variant as string);
      } else {
         selected = getProductVariant(product.variants[0].id);
         setSelectedVariant(selected);
      }

      const variantId = product.variants.find((variant) =>
         variant.id.includes(selected)
      )?.id;

      // console.log(variantId);
      setVariantId(variantId || product.variants[0].id);

      if (!checkoutSession) return;
      const lineItems = checkoutSession.lineItems.edges.map(
         (item: any) => item.node
      );

      // console.log(product.variants);

      if (!lineItems || !variantId) return;

      let item = lineItems.find((item: any) => item.variant.id === variantId);

      if (item) {
         setShowButton(false);
         setLineItem(item);
         return;
      }
      setShowButton(true);
   }, [checkoutSession, product, router, setSelectedVariant, setShowButton]);

   if (showButton) return <AddToCart productId={variantId} />;

   return <ProductQuantity item={lineItem} />;
}

export default ProductCartHandler;
