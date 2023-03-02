import React from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Link from "next/link";

function CarritoVacio() {
   return (
      <div className="flex flex-col items-center my-auto text-gray-600">
         <RemoveShoppingCartIcon
            className="text-gray-500 hover:drop-shadow-md "
            sx={{ fontSize: "4rem" }}
         />
         <p className="text-xl font-medium">Tu carrito está vacío</p>
         <p>Expora nuestro catálogo!</p>
         <Link
            href="/"
            className="px-4 py-1 mt-2 text-white bg-gray-600 rounded hover:drop-shadow-md "
         >
            Ver productos
         </Link>
      </div>
   );
}

export default CarritoVacio;
