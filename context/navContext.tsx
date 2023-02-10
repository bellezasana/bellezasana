import React, { createContext, useContext, useRef, useState } from "react";

const NavContext = createContext<any>(null);

export function useNav() {
   return useContext(NavContext);
}

export function NavProvider({ children }: any) {
   const [currentUser, setCurrentUser] = useState<any>();
   const [showSearchInput, setShowSearchInput] = useState(false);
   const [showSideBar, setShowSideBar] = useState(false);
   const [showDropdown, setShowDropdown] = useState(false);
   const navRef = useRef(null);
   const accIconRef = useRef(null);

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
      accIconRef,
   };

   return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}
