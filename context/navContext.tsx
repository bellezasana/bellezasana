import React, {
   createContext,
   useContext,
   useRef,
   useState,
   ReactNode,
   Dispatch,
   SetStateAction,
   Context,
} from "react";

interface NavContextProps {
   setShowSideBar: Dispatch<SetStateAction<boolean>>;
   showSideBar: boolean;
   setShowDropdown: Dispatch<SetStateAction<boolean>>;
   showDropdown: boolean;
   navRef: React.RefObject<HTMLDivElement>;
   accIconRef: React.RefObject<HTMLDivElement>;
   cartIconRef: React.RefObject<HTMLDivElement>;
   setProducts: Dispatch<SetStateAction<any>>;
   products: any;
   setSearchInput: Dispatch<SetStateAction<string>>;
   searchInput: string;
   setShowSearchInput: Dispatch<SetStateAction<boolean>>;
   showSearchInput: boolean;
}

const NavContext = createContext<NavContextProps | null>(null);

export function useNav() {
   return useContext(NavContext as Context<NavContextProps>);
}

export function NavProvider({ children }: { children: ReactNode }) {
   const [showSearchInput, setShowSearchInput] = useState(false);
   const [showSideBar, setShowSideBar] = useState(false);
   const [showDropdown, setShowDropdown] = useState(false);
   const [products, setProducts] = useState();
   const [searchInput, setSearchInput] = useState("");
   const navRef = useRef(null);
   const accIconRef = useRef(null);
   const cartIconRef = useRef(null);

   const value = {
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
      setShowSearchInput,
      showSearchInput,
   };

   return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}
