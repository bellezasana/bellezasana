import Footer from "@/shared/footer";
import Products from "@/shared/products";
import React from "react";
import Banner from "./banner";
import EachPurchase from "./eachPurchase";

function HomeContent() {
   return (
      <div className="flex flex-col items-center w-full mt-16 overflow-x-hidden overflow-y-scroll">
         <div className="flex max-w-xl overflow-hidden bg-red-400">
            {/* <Products /> */}
         </div>
         <EachPurchase />
         <Banner />
         <Footer />
      </div>
   );
}

export default HomeContent;
