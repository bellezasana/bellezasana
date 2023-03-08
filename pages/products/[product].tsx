import ProductContent from "@/components/product";
import Layout from "@/shared/layout";
import Navbar from "@/shared/navbar";
import Sidebar from "@/shared/sidebar";
import { shopifyAPI } from "@/utils/shopifyAPI";
import { productQuery } from "@/utils/shopifyQueries";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface ProductInterface {
   id: string;
   handle: string;
   title: string;
   description: string;
   featuredImage: {
      url: string;
   };
   price: number;
   priceRange: {
      // :
      maxVariantPrice: {
         amount: number;
         currencyCode: string;
      };
      // :
      // {amount: '27000.0', currencyCode: 'COP'}
      // minVariantPrice: number;
      // :
   };
}

function Product() {
   const [product, setProduct] = useState<ProductInterface>();
   const router = useRouter();

   useEffect(() => {
      if (router.asPath === "/products/[product]") return;
      // console.log(router.asPath);
      const fetchProduct = async () => {
         const basePath = "/products/";
         const query = productQuery(router.asPath.substring(basePath.length));
         // const query = ;
         const response = await shopifyAPI(query);
         setProduct(response.data.productByHandle);
      };
      fetchProduct();
      // setProduct(products.find((el) => el.link === router.asPath) || null);
   }, [router]);

   useEffect(() => {
      if (product === null) {
         router.push("/");
      }
      // console.log(product);
   }, [router, product]);
   return (
      <div className="flex flex-col items-center w-full h-full max-h-[100vh] bg-[#fafafa]">
         <Head>
            <title>{product?.title}</title>
            <meta name="description" content={product?.description || ""} />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Layout>{product && <ProductContent product={product} />}</Layout>
      </div>
   );
}

export default Product;
