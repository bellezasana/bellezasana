import { useNav } from "@/context/navContext";
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

function LayoutContent({ children }: { children: React.ReactNode }) {
   const { showSearchInput } = useNav();
   return (
      <>
         <Navbar />
         <div className="flex w-full h-[100vh] overflow-hidden">
            <Sidebar />
            <div
               className={`flex flex-col items-center w-full overflow-x-hidden overflow-y-scroll sm:mt-14 ${
                  showSearchInput ? "mt-28" : "mt-14"
               }`}
            >
               <div className="flex flex-col items-center flex-1 w-full mb-12">
                  {children}
               </div>
               <Footer />
            </div>
         </div>
      </>
   );
}

export default LayoutContent;
