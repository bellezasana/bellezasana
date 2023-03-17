import { useNav } from "@/context/navContext";
import { searchProducts } from "@/utils/products";
import React, { useEffect, useState } from "react";
import Card from "./card";

function Products() {
   const { products, setProducts, searchInput } = useNav();
   useEffect(() => {
      const fetchProducts = async () => {
         setProducts(await searchProducts(searchInput));
      };
      fetchProducts();
   }, [searchInput, setProducts]);

   return (
      <div className="flex justify-center w-full my-2">
         <div className="grid justify-center w-[95%] grid-cols-1 gap-3 mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product: any) => (
               <Card key={product.id} product={product} />
            ))}
         </div>
      </div>
   );
}

export default Products;
