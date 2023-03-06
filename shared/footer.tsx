import Link from "next/link";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import Image from "next/image";

function Footer() {
   return (
      <div className="flex flex-col w-full gap-8 px-2 py-8 pl-8 text-white lg:gap-2 justify-evenly bg-green-dark lg:flex-row">
         <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-xl font-bold">CONOCENOS</h2>
            <Link href="/about">Sobre Nosotros</Link>
            <Link href="/terminos-y-condiciones">Términos y Condiciones</Link>
            <Link href="/politica-de-privacidad">Política De Privacidad</Link>
         </div>
         <div className="flex flex-col gap-2 ">
            <h2 className="text-xl font-bold">CONTACTO</h2>
            <div>
               <span className="flex">
                  <CallIcon className="mr-2" />
                  <p>Telefono:</p>
               </span>
               <a href="tel:+17868051707">+1 786-805-1707</a>
            </div>
            <div>
               <span className="flex">
                  <EmailIcon className="mr-2" />
                  <p>Correo:</p>
               </span>
               <a href="mailto:bellezasana.shop@gmail.com" className="text-sm">
                  bellezasana.shop@gmail.com
               </a>
            </div>
         </div>
         <Image
            src="/LogoBellezaSana.png"
            fill
            alt=""
            className="!relative !h-[7rem] !w-[7rem] my-auto"
         />
      </div>
   );
}

export default Footer;
