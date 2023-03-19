import { useNav } from "@/context/navContext";
import { searchProducts } from "@/utils/products";
import React, { useState, useEffect, useCallback } from "react";
import PageButton from "./page";
import PrevButton from "./prevButton";
import NextButton from "./nextButton";
import { usePagination } from "@/context/paginationContext";

function PaginationBar() {
   const { searchInput } = useNav();
   const { setPages, pages, setCurrentPage } = usePagination();

   useEffect(() => {
      setPages([null]);
      setCurrentPage(0);
   }, [searchInput, setCurrentPage, setPages]);

   return (
      <span className="flex my-4 ml-auto mr-6 text-lg bg-white border-2 rounded border-beige/50">
         <PrevButton />
         {pages.map((page, index) => (
            <PageButton key={page} index={index} page={page} />
         ))}
         <NextButton />
      </span>
   );
}

export default PaginationBar;
