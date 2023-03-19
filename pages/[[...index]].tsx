import Banner from "@/components/home/banner";
import EachPurchase from "@/components/home/eachPurchase";
import Products from "@/components/products";
import Layout from "@/shared/layout";
import Head from "next/head";

export default function Home() {
   return (
      <div className="w-full flex flex-col items-center h-full max-h-[100vh] overflow-hidden bg-[#fafafa] ">
         <Head>
            <title>Belleza Sana</title>
            <meta name="description" content="Belleza Sana" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <Banner />
            <EachPurchase />
            <div className="lg:px-10">
               <Products />
            </div>
         </Layout>
      </div>
   );
}
