import { usePagination } from "@/context/paginationContext";
import React from "react";

const display = (
   pages: (string | null)[],
   index: number,
   currentPage: number
) => {
   let diff = Math.abs(index - currentPage);

   if (
      index === 0 ||
      index === pages.length - 1 ||
      index === currentPage ||
      diff == 1
   )
      return index + 1;
   if (diff > 1 && diff < 3) return "...";

   return null;
};
interface PageButtonProps {
   index: number;
   page: string | null;
}

function PageButton({ index, page }: PageButtonProps) {
   const { setCurrentPage, currentPage, pages } = usePagination();
   let displayPage = display(pages, index, currentPage);

   if (displayPage === null) return null;

   return (
      <button
         onClick={() => {
            setCurrentPage(index);
         }}
         className={`font-normal px-2 ${
            index === currentPage ? "bg-beige/70" : ""
         }`}
      >
         {displayPage}
      </button>
   );
}

export default PageButton;
