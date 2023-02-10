import { useNav } from "@/context/navContext";
import React, { useState } from "react";
import AccDropdown from "./accDropdown";
import AccIcon from "./accIcon";

function Account() {
   const { showDropdown } = useNav();

   return (
      <div>
         <AccIcon />
         {showDropdown && <AccDropdown />}
      </div>
   );
}

export default Account;
