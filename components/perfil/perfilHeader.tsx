import { useAuth } from "@/context/authContext";
import Image from "next/image";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";

function PerfilHeader() {
   const { currentUser } = useAuth();
   return (
      <div className="flex items-center w-full max-w-xl">
         <div className="w-[3rem] rounded-full overflow-hidden">
            {currentUser.photoURL ? (
               <Image
                  src={currentUser.photoURL}
                  alt="Foto de perfil"
                  fill
                  className="!relative w-full"
               />
            ) : (
               <PersonIcon className="text-gray-700" />
            )}
         </div>
         <p className="ml-4 text-xl font-medium">{currentUser.displayName}</p>
      </div>
   );
}

export default PerfilHeader;
