import NoOrders from "@/components/pedidos/noOrders";
import OrdersTable from "@/components/pedidos/ordersTable";
import { useAuth } from "@/context/authContext";
import Layout from "@/shared/layout";
import { shopifyAPI } from "@/utils/shopifyAPI";
import Head from "next/head";

import React, { useEffect, useState } from "react";

function Pedidos() {
   return (
      <div className="w-full flex flex-col items-center h-full max-h-[100vh] overflow-hidden  ">
         <Head>
            <title>Pedidos</title>
            <meta name="description" content="Belleza Sana" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <OrdersTable />
         </Layout>
      </div>
   );
}

export default Pedidos;
