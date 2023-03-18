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
         className={`flex sm:mx-auto sm:!w-full max-w-[35ch]  items-center sm:h-full  bg-white justify-center  cursor-pointer sm:rounded border-l-2 border-r-2 border-gray-200  sm:aspect-auto ${
            showSearchInput
               ? "mx-auto h-full"
               : "ml-auto rounded-full h-12 aspect-square !w-12"
         }`}
      >
         <SearchIcon className="mx-2 text-gray-700" onClick={toggle} />
         <input
            className={`${
               showSearchInput ? "" : "hidden"
            }  !h-full py-3 outline-none w-full sm:flex text-[min(16px_1rem)]`}
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar"
         />
      </div>
   );
}

export default Searchbar;
