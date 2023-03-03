import React, { createContext, useContext, useRef, useState } from "react";

const NavContext = createContext<any>(null);

export function useNav() {
   return useContext(NavContext);
}

export function NavProvider({ children }: any) {
   const [showSearchInput, setShowSearchInput] = useState(false);
   const [showSideBar, setShowSideBar] = useState(false);
   const [showDropdown, setShowDropdown] = useState(false);
   const [showCartAlert, setShowCartAlert] = useState(false);
   const [products, setProducts] = useState();
   const [searchInput, setSearchInput] = useState("");
   // const [checkoutSession, setCheckoutSession] = useState();
   const navRef = useRef(null);
   const accIconRef = useRef(null);
   const cartIconRef = useRef(null);

   const value = {
      setShowCartAlert,
      showCartAlert,
      setShowSearchInput,
      showSearchInput,
      setShowSideBar,
      showSideBar,
      setShowDropdown,
      showDropdown,
      navRef,
      accIconRef,
      cartIconRef,
      setProducts,
      products,
      setSearchInput,
      searchInput,
      // setCheckoutSession,
      // checkoutSession,
   };

   return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}
