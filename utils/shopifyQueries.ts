import { shopifyAPI } from "./shopifyAPI";
import { checkoutCreate } from "./shopifyMutations";

export const customerQuery = (access_token: string) => {
   return `customer(customerAccessToken: "${access_token}") {
    id
    firstName
    lastName
    email
    phone
    lastIncompleteCheckout {
      id
    }
    addresses(first: 10) {
      edges {
        node {
          address1
          address2
          city
          company
          country
          firstName
          id
          lastName
          phone
          province
          zip
        }
      }
    }
  }`;
};

export const checkoutQuery = (checkoutId: string) => {
   return `
    node(id: "${checkoutId}") {
      ... on Checkout {
        id
        webUrl
        subtotalPriceV2 {
          amount
          currencyCode
        }
        lineItems(first: 10) {
          edges {
            node {
              id
              title
              variant {
                product {
                  handle
                }
                id
                title
                image {
                  src
                }
                priceV2 {
                  amount
                  currencyCode
                }
                unitPrice {
                  amount
                  currencyCode
                }
                availableForSale
              }
              quantity
            }
          }
        }
      }
    }
  `;
};

export const getCheckoutSession = async (customerAccessToken: string) => {
   const customerResponse = await shopifyAPI(
      customerQuery(customerAccessToken)
   );
   let checkoutId =
      customerResponse?.data?.customer?.lastIncompleteCheckout?.id;
   if (!checkoutId) {
      const checkoutResponse = await shopifyAPI(
         checkoutCreate(customerResponse?.data?.customer?.email),
         true
      );

      checkoutId = checkoutResponse?.data?.checkoutCreate?.checkout?.id;
   }
   const checkoutResponse = await shopifyAPI(checkoutQuery(checkoutId));

   const checkoutNode = checkoutResponse?.data?.node;

   if (!checkoutNode) return;

   return checkoutNode;
};
