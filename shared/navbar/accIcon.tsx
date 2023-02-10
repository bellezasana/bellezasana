import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import { useNav } from "@/context/navContext";
import { useRouter } from "next/router";

function AccIcon() {
   const router = useRouter();
   const { currentUser } = useAuth();
   const { setShowDropdown, accIconRef } = useNav();

   const handleClick = () => {
      if (!currentUser) {
         router.push("/auth/login");
         return;
      }
      setShowDropdown((show: boolean) => !show);
   };

   return (
      <span
         ref={accIconRef}
         onClick={handleClick}
         className="flex aspect-square ml-1 mr-4 bg-white rounded-full drop-shadow-md h-[2.5rem] items-center justify-center cursor-pointer hover:drop-shadow-lg overflow-hidden"
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
