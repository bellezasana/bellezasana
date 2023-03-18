import React, { useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { useNav } from "@/context/navContext";
import { useClickOutside } from "@/utils/useClickOutside";
import { useAuth } from "@/context/authContext";

function AccDropdown() {
   const { setShowDropdown, accIconRef } = useNav();
   const { currentUser, logout } = useAuth();

   const dropRef = useRef<HTMLDivElement>(null);

   const closeDropdown = () => setShowDropdown(false);

   useClickOutside([dropRef, accIconRef], closeDropdown);
   return (
      <div
         ref={dropRef}
         className="absolute bg-white rounded-sm top-full right-2 drop-shadow z-[9999]"
      >
         {currentUser && (
            <div className="p-2 text-sm bg-white rounded drop-shadow-lg">
               <div>
                  <p className="text-base font-medium">
                     {currentUser?.displayName || currentUser?.email}
                  </p>
               </div>
               <div className="flex flex-col pt-2 mt-2 text-blue-700 border-t-2">
                  <Link className="hover:underline" href={`/perfil`}>
                     Perfil
                  </Link>

                  <button
                     onClick={logout}
                     className="text-start hover:underline"
                  >
                     Cerrar Sesion
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}

export default AccDropdown;
