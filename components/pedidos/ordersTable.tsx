import { useAuth } from "@/context/authContext";
import { shopifyAPI } from "@/utils/shopifyAPI";
// import { ordersQueryWithCursorNoLineItems } from "@/utils/shopifyQueries";
import React, { useState, useEffect } from "react";
import NoOrders from "./noOrders";
import OrderItem from "./orderItem";

export interface Order {
   id: string;
   orderNumber: number;
   processedAt: string;
   totalPriceV2: {
      amount: string;
      currencyCode: string;
   };
   fulfillmentStatus: string;
   // statusUrl: string;
   totalPrice: string;
}

function OrdersTable() {
   const { currentUser, accessToken } = useAuth();
   const [showOrders, setShowOrders] = useState(false);
   const [orders, setOrders] = useState<Order[]>([]);

   useEffect(() => {
      if (!currentUser) {
         setShowOrders(false);
         return;
      }

      const getOrders = async () => {
         // const ordersResponse = await shopifyAPI(
         //    ordersQueryWithCursorNoLineItems(accessToken)
         // );
         // console.log(ordersResponse.data.customer.orders);

         // const totalCount =
         //    Number(ordersResponse?.data?.customer?.orders?.totalCount) || 0;
         // if (totalCount === 0) return;
         // setOrders(
         //    ordersResponse.data.customer.orders.edges.map(
         //       (order: any) => order.node
         //    )
         // );
         setShowOrders(true);
      };
      getOrders();
   }, [currentUser, accessToken]);

   if (!showOrders) return <NoOrders />;

   return (
      <table className="w-full mt-2 bg-white rounded drop-shadow-md">
         <thead className="bg-[#fafafa] text-left ">
            <tr>
               <th className="p-2">Order Number</th>
               <th className="p-2">Fecha</th>
               <th className="p-2">Estado</th>
               <th className="p-2">Total</th>
            </tr>
         </thead>
         <tbody>
            {orders.map((order) => (
               <OrderItem order={order} key={order.id} />
            ))}
         </tbody>
      </table>
   );
}

export default OrdersTable;
