import React from "react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { usePagination } from "@/context/paginationContext";

function PrevButton() {
   const { setCurrentPage, res } = usePagination();
   const handlePrevPage = () => {
      if (!res.hasPreviousPage) return;
      setCurrentPage((current) => current - 1);
   };
   const hasPreviousPage = res?.hasPreviousPage;
   return (
      <button
         onClick={handlePrevPage}
         disabled={!hasPreviousPage}
         className={`${
            !hasPreviousPage && "text-gray-400"
         } font-bold flex items-center`}
      >
         <ChevronLeftIcon sx={{ fontSize: "1.5rem" }} />
      </button>
   );
}

export default PrevButton;
