import Banner from "@/components/home/banner";
import EachPurchase from "@/components/home/eachPurchase";
import Footer from "@/shared/footer";
import Products from "@/shared/products";
import Head from "next/head";

export default function Home() {
   return (
      <div className="w-full flex flex-col items-center h-full bg-[#fafafa]">
         <Head>
            <title>Belleza Sana</title>
            <meta name="description" content="Belleza Sana" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Banner />
         <EachPurchase />
         <Products />
         <Footer />
      </div>
   );
}
