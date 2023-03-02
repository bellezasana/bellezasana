import { NavProvider } from "@/context/navContext";
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

function Layout({ children }: { children: React.ReactNode }) {
   return (
      <NavProvider>
         <Navbar />
         <div className="flex w-full h-[100vh] overflow-hidden">
            <Sidebar />
            <div className="flex flex-col items-center w-full mt-16 overflow-x-hidden overflow-y-scroll">
               <div className="flex flex-col items-center flex-1 w-full px-4 mb-12">
                  {children}
               </div>
               <Footer />
            </div>
         </div>
      </NavProvider>
   );
}

export default Layout;
