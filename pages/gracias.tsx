import Head from "next/head";
import React from "react";

function Gracias() {
   return (
      <div className="w-full flex flex-col items-center h-full max-h-[100vh] overflow-hidden  ">
         <Head>
            <title>Gracias por tu compra</title>
            <meta name="description" content="Belleza Sana" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
      </div>
   );
}

export default Gracias;
