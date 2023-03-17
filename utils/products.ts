import {
   productQuery,
   searchProductsQuery,
} from "@/shopifyUtils/productQueries";
import { shopifyAPI } from "./shopifyAPI";

export class Product {
   id: string;
   title: string;
   handle: string;
   price: string;
   description: string;
   images: string[];
   variants: Variant[];
   featuredImage: string;
   descriptionHTML: string;

   constructor(product: {
      id: string;
      title: string;
      handle: string;
      price: string;
      description: string;
      images: string[];
      variants: Variant[];
      descriptionHTML: string;
      featuredImage: string;
   }) {
      this.id = product.id;
      this.title = product.title;
      this.handle = product.handle;
      this.price = product.price;
      this.description = product.description;
      this.descriptionHTML = product.descriptionHTML;
      this.images = product.images;
      this.featuredImage = product.featuredImage;
      this.variants = product.variants;
   }
}
export class Variant {
   image: {
      src: string;
      altText: string;
   };
   id: string;
   price: string;
   title: string;

   constructor(variant: {
      image: {
         src: string;
         altText: string;
      };
      id: string;
      price: string;
      title: string;
   }) {
      this.image = variant.image;
      this.id = variant.id;
      this.price = variant.price;
      this.title = variant.title;
   }
}

export const formatShopifyProduct = (product: any) => {
   return new Product({
      id: product.id,
      title: product.title,
      handle: product.handle,
      price: product.priceRange.minVariantPrice.amount,
      description: product.description,
      descriptionHTML: product.descriptionHtml,
      images: product.images.edges.map((image: any) => image.node.originalSrc),
      featuredImage: product.featuredImage.originalSrc,
      variants: product.variants.edges.map((variant: any) =>
         formatShopifyVariant(variant)
      ),
   });
};

export const formatShopifyVariant = (variant: any) => {
   return new Variant({
      image: variant.node.image,
      id: variant.node.id,
      price: variant.node.priceV2?.amount || "",
      title: variant.node.title,
   });
};

export const searchProducts = async (query: string) => {
   const shopifyResponse = await shopifyAPI(searchProductsQuery(query));
   // console.log(shopifyResponse);

   const shopifyProducts: Product[] =
      shopifyResponse?.data?.products?.edges?.map((product: any) =>
         formatShopifyProduct(product.node)
      ) || [];
   return [...shopifyProducts];
};

export const getProduct = async (handle: string) => {
   const shopifyResponse = await shopifyAPI(productQuery(handle));
   // console.log(shopifyResponse);
   const shopifyProduct = shopifyResponse?.data?.productByHandle;
   // console.log(shopifyProduct);
   const product = formatShopifyProduct(shopifyProduct);
   return product;
};
