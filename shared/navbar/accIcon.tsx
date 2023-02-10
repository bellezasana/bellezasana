import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useNav } from "@/context/navContext";

function AccIcon() {
   const { currentUser } = useAuth();
   const { setShowDropdown } = useNav();
   const toggleShowDropdown = () => setShowDropdown((show: boolean) => !show);

   return (
      <span
         onClick={toggleShowDropdown}
         className="flex aspect-square ml-1 mr-4 bg-white rounded-full drop-shadow-md h-[2.5rem] items-center justify-center cursor-pointer hover:drop-shadow-lg"
      >
         {currentUser?.photoURL ? (
            <span className="relative flex w-full aspect-square">
               <Image src={currentUser.photoURL} alt="" fill />
            </span>
         ) : (
            <PersonIcon className="text-gray-700" />
         )}
      </span>
   );
}

export default AccIcon;
