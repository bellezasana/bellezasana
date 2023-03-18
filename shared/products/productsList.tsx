import { useNav } from "@/context/navContext";
import { usePagination } from "@/context/paginationContext";
import { searchProducts } from "@/utils/products";
import React, { useCallback, useEffect } from "react";
import Card from "./card";

function ProductsList({ quantity }: { quantity?: number }) {
   const { products, searchInput, setProducts } = useNav();
   const { setRes, pages, currentPage } = usePagination();
   const fetchProducts = useCallback(async () => {
      const response = await searchProducts(
         searchInput,
         quantity || 6,
         pages[currentPage]
      );
      setRes(response);

      setProducts(response.products);
   }, [searchInput, pages, currentPage, setRes, setProducts, quantity]);

   useEffect(() => {
      fetchProducts();
   }, [fetchProducts]);
   return (
      <div className="grid justify-center w-full grid-cols-2 gap-1 mx-auto sm:grid-cols-3 lg:grid-cols-4">
         {products?.map((product: any) => (
            <Card key={product.id} product={product} />
         ))}
      </div>
   );
}

export default ProductsList;
