import React, { useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNav } from "@/context/navContext";
import { useClickOutside } from "@/utils/useClickOutside";

function Searchbar() {
   const { setShowSearchInput, showSearchInput, setSearchInput, searchInput } =
      useNav();
   const searchRef = useRef<HTMLDivElement>(null);

   const toggle = () => setShowSearchInput((show: boolean) => !show);
   useClickOutside(searchRef, () => setShowSearchInput(false));

   return (
      <div
         ref={searchRef}
         className={`flex items-center h-full max-w-md bg-white  cursor-pointer sm:rounded  sm:mx-auto sm:w-[60%]   drop-shadow-md hover:drop-shadow-lg  sm:aspect-auto ${
            showSearchInput ? "w-[80%] mx-auto" : " rounded-full aspect-square"
         }`}
      >
         <SearchIcon className="mx-2 text-gray-700" onClick={toggle} />
         <input
            className={`${
               showSearchInput ? "" : "hidden"
            }  h-full py-3 outline-none w-fit sm:w-full sm:flex text-[min(16px_1rem)]`}
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar"
         />
      </div>
   );
}

export default Searchbar;
