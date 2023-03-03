import Banner from "@/components/home/banner";
import HomeContent from "@/components/home/content";
import EachPurchase from "@/components/home/eachPurchase";
import Footer from "@/shared/footer";
import Layout from "@/shared/layout";
import Navbar from "@/shared/navbar";
import Products from "@/shared/products";
import Sidebar from "@/shared/sidebar";
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
            <Products />
         </Layout>
      </div>
   );
}
