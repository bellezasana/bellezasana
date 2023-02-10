import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNav } from "@/context/navContext";

function Searchbar() {
   const { setShowSearchInput } = useNav();

   const toggle = () => setShowSearchInput((show: boolean) => !show);

   return (
      <div className="flex items-center h-full max-w-md bg-white rounded-full cursor-pointer sm:rounded sm:mx-auto sm:w-[60%] w-fit drop-shadow-md hover:drop-shadow-lg aspect-square sm:aspect-auto">
         <SearchIcon className="mx-2 text-gray-700" onClick={toggle} />
         <input
            className="hidden h-full my-2 outline-none w-fit sm:w-full sm:flex"
            type="text"
            placeholder="Buscar"
         />
      </div>
   );
}

export default Searchbar;
