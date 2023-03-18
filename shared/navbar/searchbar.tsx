import React, { useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNav } from "@/context/navContext";

function Searchbar() {
   const { setSearchInput, searchInput } = useNav();
   const searchRef = useRef<HTMLDivElement>(null);

   return (
      <div
         ref={searchRef}
         className="w-full flex  sm:!w-full   items-center bg-white justify-center  cursor-pointer rounded overflow-hidden drop-shadow border-[1px] border-gray-200  h-full "
      >
         <SearchIcon className="mx-2 text-gray-700" />
         <input
            className="!h-full py-3 outline-none w-full sm:flex text-[min(16px_1rem)]"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar"
         />
      </div>
   );
}

export default Searchbar;
