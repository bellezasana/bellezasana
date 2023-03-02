import { shopifyAPI } from "@/utils/shopifyAPI";
import { productsQuery } from "@/utils/shopifyQueries";
import React, { useEffect, useState } from "react";
import Card from "./card";
const test =
   "gid://shopify/Checkout/dca7b6dafc6ccaea10323cc51873c27f?key=5c25be12528a7772557510c0293baf3c";
function Products() {
   const [products, setProducts] = useState<any>();
   useEffect(() => {
      const fetchProducts = async () => {
         const query = productsQuery();
         const eproducts = await shopifyAPI(query);
         // console.log(eproducts);

         // const response = await shopifyAPI(mutation);
         // console.log(response);

         // console.log(eproducts);
         setProducts(eproducts.data.products.edges);
         // console.log(eproducts.data.products.edges);
      };
      fetchProducts();
   }, []);

   return (
      <div className="flex justify-center w-full my-2">
         <div className="grid justify-center w-[95%] grid-cols-1 gap-3 mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product: any) => (
               <Card key={product.node.id} product={product.node} />
            ))}
         </div>
      </div>
   );
}

export default Products;
