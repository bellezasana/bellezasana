import { useAuth } from "@/context/authContext";
import { auth } from "@/utils/firebaseConfig";
import { shopifyAPI } from "@/utils/shopifyAPI";
import { checkoutCreate } from "@/utils/shopifyMutations";
import { customerQuery } from "@/utils/shopifyQueries";
import { updateProfile } from "firebase/auth";
import React, { useState, useEffect } from "react";

function ProfileName() {
   const { currentUser, setCurrentUser, accessToken } = useAuth();
   const [inputName, setInputName] = useState(currentUser.displayName || "");
   const [showSave, setShowSave] = useState(true);

   // useEffect(() => {
   //    const loadCustomer = async () => {
   //       const customer = customerQuery(accessToken);
   //       const res = await shopifyAPI(customer);
   //       console.log(res.data);
   //    };
   //    loadCustomer();
   // }, [accessToken]);

   const createCheckout = async () => {
      const checkoutMutation = checkoutCreate(currentUser.email);
      const checkout = await shopifyAPI(checkoutMutation, true);
      console.log(checkout);
   };
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
   // "gid://shopify/Checkout/a1b2842194856da9f55d7cd3001878dc?key=0280700490721f1b553a57f878d09cdf"
   return (
      <div className="flex flex-col w-full max-w-md">
         {/* <button onClick={createCheckout}>create checkout</button> */}
         <p>Nombre:</p>
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
