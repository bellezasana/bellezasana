import Link from "next/link";
import React, { useRef } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useRouter } from "next/router";
import SidebarItem from "./sidebarItem";
import { useNav } from "@/context/navContext";
import { useClickOutside } from "@/utils/useClickOutside";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const navbarItems = [
   {
      href: "/",
      text: "Inicio",
      icon: <HomeIcon />,
   },
   {
      href: "/pedidos",
      text: "Pedidos",
      icon: <ShoppingBasketIcon />,
   },
   {
      href: "/perfil",
      text: "Cuenta",
      icon: <AccountCircleIcon />,
   },
];

function Sidebar() {
   const router = useRouter();
   const { showSideBar, setShowSideBar, navRef } = useNav();
   const sidebarRef = useRef<HTMLDivElement>(null);

   useClickOutside([navRef, sidebarRef], () => setShowSideBar(false));

   return (
      <div
         ref={sidebarRef}
         className={`z-[900] h-full max-h-[100vh] bg-white w-fit border-r-2 border-[#eee] md:flex ${
            showSideBar ? "flex" : "hidden"
         } fixed md:relative `}
      >
         <ul className="relative flex flex-col h-full max-w-sm overflow-hidden">
            {navbarItems.map((item) => (
               <SidebarItem
                  key={item.href}
                  item={item}
                  asPath={router.asPath}
               />
            ))}
         </ul>
      </div>
   );
}

export default Sidebar;
