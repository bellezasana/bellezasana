import React from "react";
import ProductsList from "./productsList";
import PaginationBar from "./pagination";
import { PaginationProvider } from "@/context/paginationContext";

interface ProductsProps {
   withPagination?: boolean;
   quantity?: number;
}

function Products({ withPagination = true, quantity }: ProductsProps) {
   const pagination = withPagination ? <PaginationBar /> : null;
   return (
      <PaginationProvider>
         <div className="flex flex-col items-center w-full my-2">
            {pagination}
            <ProductsList quantity={quantity} />
            {pagination}
         </div>
      </PaginationProvider>
   );
}

export default Products;
