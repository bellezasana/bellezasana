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
      <li className="px-2 last:mb-2 last:mt-auto first:mt-16">
         <Link
            href={item.href}
            className={`flex items-center w-full py-2 pl-2 pr-8 leading-4  rounded mb-1 ${
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
