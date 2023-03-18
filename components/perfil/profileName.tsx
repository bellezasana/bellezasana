import { useAuth } from "@/context/authContext";
import { auth } from "@/utils/firebaseConfig";
import { shopifyAPI } from "@/utils/shopifyAPI";
import { checkoutCreate } from "@/utils/shopifyMutations";
import { customerQuery } from "@/utils/shopifyQueries";
import { updateProfile } from "firebase/auth";
import React, { useState, useEffect } from "react";

function ProfileName() {
   const { currentUser, setCurrentUser } = useAuth();
   const [inputName, setInputName] = useState(currentUser.displayName || "");
   const [showSave, setShowSave] = useState(true);

   useEffect(() => {
      if (inputName === currentUser.displayName) {
         setShowSave(false);
         return;
      }
      setShowSave(true);
   }, [inputName, currentUser]);

   const saveName = async () => {
      if (
         !inputName ||
         inputName === "" ||
         inputName === currentUser.displayName
      )
         return;

      try {
         await updateProfile(auth.currentUser!, {
            displayName: inputName.trim(),
         });
         setCurrentUser({ ...currentUser, displayName: inputName.trim() });
         setShowSave(false);
      } catch (error) {}
   };
   return (
      <div className="flex flex-col w-full max-w-md">
         <p className="mt-2">Nombre:</p>
         <div className="flex">
            <input
               type="text"
               value={inputName}
               onChange={(e) => setInputName(e.target.value)}
               className="flex w-full p-1 border-[1px] border-gray-700 rounded"
            />
            {showSave && (
               <button
                  onClick={saveName}
                  className="px-4 py-1 mx-1 text-gray-100 rounded cursor-pointer bg-green-dark hover:drop-shadow-md"
               >
                  Guardar
               </button>
            )}
         </div>
      </div>
   );
}

export default ProfileName;
