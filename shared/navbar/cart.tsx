import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function ShoppingCart() {
   return (
      <span className="flex aspect-square ml-1 bg-white rounded-full drop-shadow-md h-[2.5rem] items-center justify-center cursor-pointer hover:drop-shadow-lg">
         <ShoppingCartIcon className="flex text-gray-700" />
      </span>
   );
}

export default ShoppingCart;
