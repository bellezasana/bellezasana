import ProductContent from "@/components/product";
import { ProductProvider } from "@/context/productContext";
import Layout from "@/shared/layout";
import Navbar from "@/shared/navbar";
import Sidebar from "@/shared/sidebar";
import { getProduct, Product } from "@/utils/products";
// import { shopifyAPI } from "@/utils/shopifyAPI";
// import { productQuery } from "@/utils/shopifyQueries";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ProductPage() {
   const [product, setProduct] = useState<Product>();
   const router = useRouter();

   useEffect(() => {
      if (router.asPath === "/products/[product]") return;

      const fetchProduct = async () => {
         const basePath = "/products/";
         let productHandle = router.asPath.substring(basePath.length);
         // remove string after ? in url
         const index = productHandle.indexOf("?");
         if (index !== -1) {
            productHandle = productHandle.substring(0, index);
         }

         setProduct((await getProduct(productHandle)) || null);
      };
      fetchProduct();
   }, [router]);

   useEffect(() => {
      if (product === null) {
         router.push("/");
      }
   }, [router, product]);

   if (!product) return null;

   return (
      <div className="flex flex-col items-center w-full h-screen  bg-[#fafafa]">
         <Head>
            <title>{product?.title}</title>
            <meta name="description" content={product?.description || ""} />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>
            <ProductProvider>
               <ProductContent product={product} />
            </ProductProvider>
         </Layout>
      </div>
   );
}

export default ProductPage;
