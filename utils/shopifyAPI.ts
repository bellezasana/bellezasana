export const mergeStrings = (strings: string[]) => {
   const result = `
    ${strings.join("\n")}
  `;
   return result;
};
export const shopifyAPI = async (
   query_mutation: string | string[],
   mutation: boolean = false
) => {
   const storeName = process.env.NEXT_PUBLIC_SHOPIFY_SHOP;
   const storefrontAccessToken =
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN!;

   const headers = {
      "Content-Type": "application/graphql",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
   };

   const request =
      query_mutation instanceof Array
         ? mergeStrings(query_mutation)
         : query_mutation;

   try {
      const response = await fetch(
         `https://${storeName}/api/2023-01/graphql.json`,
         {
            method: "POST",
            headers,
            body: `${mutation ? "mutation" : "query"}{
               ${request}
               }`,
         }
      );

      const data = await response.json();
      // console.log(data);
      return data;
   } catch (error) {
      console.error(error);
   }
};
