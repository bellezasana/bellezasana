import { dateDDMMYY } from "@/utils/dateFormats";
import Link from "next/link";
import React from "react";
import { Order } from "./ordersTable";

function OrderItem({ order }: { order: Order }) {
   return (
      <tr className="text-sm ">
         <td className="flex">
            <Link
               href={`/pedido/${order.id}`}
               className="w-full p-2 text-blue-400 underline underline-offset-2"
            >
               {order.orderNumber}
            </Link>
         </td>
         <td className="p-2">{dateDDMMYY(new Date(order.processedAt))}</td>
         <td className="p-2">{order.fulfillmentStatus}</td>
         <td className="p-2">
            {Number(order.totalPriceV2.amount).toLocaleString("es-CO", {
               style: "currency",
               currency: "COP",
            })}
         </td>
      </tr>
   );
}

export default OrderItem;
