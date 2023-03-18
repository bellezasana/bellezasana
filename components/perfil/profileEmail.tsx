import { useAuth } from "@/context/authContext";
import React from "react";

function ProfileEmail() {
   const { currentUser } = useAuth();
   return (
      <span>
         <p>Email:</p>
         <p>{currentUser.email}</p>
      </span>
   );
}

export default ProfileEmail;
