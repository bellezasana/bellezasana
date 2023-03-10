import Layout from "@/shared/layout";
import Head from "next/head";
import React from "react";

function About() {
   return (
      <div className="w-full flex flex-col items-center h-full max-h-[100vh] overflow-hidden bg-[#e2e0c1] ">
         <Head>
            <title>Carrito de compras</title>
            <meta name="description" content="Belleza Sana" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <div className="my-8 border-b-2 border-white">
               <h1 className="font-medium font-haviland text-8xl">Nosotros</h1>
            </div>
            <div className="flex flex-col max-w-xl gap-4 px-4 mb-8 font-thin">
               <p>
                  ¡Somos una empresa nueva fundada en 2023, queremos impulsar la
                  belleza, el cuidado del cuerpo y al mismo tiempo fomentarla
                  belleza interior!
               </p>
               <p>
                  Para nosotros una vida tranquila está llena de las acciones
                  que tomas para cuidar de tu cuerpo y tu mente.
               </p>
               <p>
                  Nuestra misión es que cuando recibas tu pedido puedas sentir
                  que tú nos importas
               </p>
               <p>
                  Esperamos que tengas la mejor experiencia de compra. Si tienes
                  dudas, o necesitas soporte por favor escríbenos a nuestro
                  correo:
                  <a
                     href="mailto:bellezasana.shop@gmail.com"
                     target="_blank"
                     rel="noreferrer"
                     className="ml-1 text-blue-400 underline"
                  >
                     bellezasana.shop@gmail.com
                  </a>
               </p>
            </div>
         </Layout>
      </div>
   );
}

export default About;
