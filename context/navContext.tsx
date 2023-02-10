import React, { createContext, useContext, useRef, useState } from "react";

const NavContext = createContext<any>(null);

export function useNav() {
   return useContext(NavContext);
}

export function NavProvider({ children }: any) {
   const [currentUser, setCurrentUser] = useState<any>();
   const [showSearchInput, setShowSearchInput] = useState(true);
   const [showSideBar, setShowSideBar] = useState(false);
   const [showDropdown, setShowDropdown] = useState(false);
   const navRef = useRef(null);

   const value = {
      setCurrentUser,
      currentUser,
      setShowSearchInput,
      showSearchInput,
      setShowSideBar,
      showSideBar,
      setShowDropdown,
      showDropdown,
      navRef,
   };

   return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}
