import { useNav } from "@/context/navContext";
import { shopifyAPI } from "@/utils/shopifyAPI";
import { productsQuery, searchProductsQuery } from "@/utils/shopifyQueries";
import React, { useEffect, useState } from "react";
import Card from "./card";

function Products() {
   const { products, setProducts, searchInput } = useNav();
   useEffect(() => {
      const fetchProducts = async () => {
         const productsResponse = await shopifyAPI(
            searchProductsQuery(searchInput)
         );
         // console.log(eproducts.data.products.edges);

         setProducts(productsResponse?.data.products.edges || []);
      };
      fetchProducts();
   }, [searchInput, setProducts]);

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
