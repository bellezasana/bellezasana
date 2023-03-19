import { NavProvider } from "@/context/navContext";
import React from "react";
import Footer from "./footer";
import LayoutContent from "./layoutContent";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

function Layout({ children }: { children: React.ReactNode }) {
   return (
      <NavProvider>
         <LayoutContent>{children}</LayoutContent>
      </NavProvider>
   );
}

export default Layout;
