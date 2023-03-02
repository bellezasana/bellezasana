import PerfilHeader from "@/components/perfil/perfilHeader";
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
         <div className="w-full flex flex-col items-center h-full max-h-[100vh] overflow-hidden  ">
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
               <ProfilePhoto />
               <ProfileName />
            </Layout>
         </div>
      </WithAuth>
   );
}

export default Perfil;
