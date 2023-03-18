import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePagination } from "@/context/paginationContext";

function NextButton() {
   const { res, setCurrentPage, pages, setPages } = usePagination();
   const handleNextPage = () => {
      if (!res.hasNextPage) return;
      setCurrentPage((current) => current + 1);
      if (pages.includes(res.endCursor)) return;
      setPages((pages) => [...pages, res.endCursor]);
   };
   const hasNextPage = res?.hasNextPage;
   return (
      <button
         onClick={handleNextPage}
         className={`${
            !hasNextPage && "text-gray-400"
         } font-bold flex items-center`}
         disabled={!hasNextPage}
      >
         <ChevronRightIcon sx={{ fontSize: "1.5rem" }} />
      </button>
   );
}

export default NextButton;
