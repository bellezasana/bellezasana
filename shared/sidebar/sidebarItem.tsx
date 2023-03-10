import Link from "next/link";
import React from "react";

interface SidebarItemProps {
   item: {
      href: string;
      text: string;
      icon: any;
   };
   asPath: string;
}

function SidebarItem({ item, asPath }: SidebarItemProps) {
   let match = item.href === asPath;
   return (
      <li className=" last:mb-2 last:mt-auto first:mt-14">
         <Link
            href={item.href}
            className={`flex items-center w-full py-2 pl-3 pr-9 leading-4  rounded  ${
               match && "bg-[#f5f5f5]"
            }`}
         >
            <span className="pr-2 text-gray-700">{item.icon}</span>
            <p>{item.text}</p>
         </Link>
      </li>
   );
}

export default SidebarItem;
