import PerfilHeader from "@/components/perfil/perfilHeader";
import ProfileEmail from "@/components/perfil/profileEmail";
import ProfileName from "@/components/perfil/profileName";
import ProfilePhoto from "@/components/perfil/profilePhoto";
import { useAuth } from "@/context/authContext";
import Layout from "@/shared/layout";
import Navbar from "@/shared/navbar";
import WithAuth from "@/utils/withAuth";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Perfil() {
   return (
      <WithAuth>
         <div className="w-full flex flex-col items-center h-full max-h-[100vh] overflow-hidden bg-[#e2e0c1]">
            <Head>
               <title>Perfil</title>
               <meta name="description" content="Belleza Sana" />
               <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
               />
               <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
               <div className="flex flex-col justify-center w-full gap-3 p-8 lg:flex-row">
                  <div className="flex px-4 py-6 bg-white rounded drop-shadow ">
                     <ProfilePhoto />
                  </div>
                  <div className="w-full p-8 bg-white rounded lg:max-w-lg drop-shadow">
                     <h2 className="w-full pb-2 mb-2 text-2xl font-bold border-b-2 border-b-gray-400/25">
                        Perfil
                     </h2>
                     <ProfileEmail />
                     <ProfileName />
                  </div>
               </div>
            </Layout>
         </div>
      </WithAuth>
   );
}

export default Perfil;
