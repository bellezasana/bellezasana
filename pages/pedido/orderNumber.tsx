import { useAuth } from "@/context/authContext";
import Layout from "@/shared/layout";
import { shopifyAPI } from "@/utils/shopifyAPI";
// import { getOrderByNumber } from "@/utils/shopifyQueries";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function OrderNumber() {
   const { currentUser, accessToken } = useAuth();
   const [order, setOrder] = useState();
   const router = useRouter();
   useEffect(() => {
      const getOrder = async () => {
         const { orderNumber } = router.query;
         if (!orderNumber || typeof orderNumber !== "string") return;

         // const order = await shopifyAPI(
         //    getOrderByNumber(accessToken, orderNumber)
         // );
         // console.log(order);
         // setOrder(order);
      };
      getOrder();
   }, [accessToken, router]);

   return (
      <div className="w-full flex flex-col items-center h-full max-h-[100vh] overflow-hidden  ">
         <Head>
            <title>Order</title>
            <meta name="description" content="Belleza Sana" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <h1>Order Number</h1>
         </Layout>
      </div>
   );
}

export default OrderNumber;
