import { shopifyAPI } from "./shopifyAPI";

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
//export the first 10 products
export const productsQuery = () => {
   return `
 products(first: 10) {
    edges {
      node {
        id
        featuredImage {
          src
        }
        availableForSale
        handle
        variants(first: 10) {
          edges {
            cursor
            node {
              id
            }
          }
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
      cursor
    }
    pageInfo {
      endCursor
      hasPreviousPage
      hasNextPage
      startCursor
    }
  }
`;
};

export const productQuery = (handle: string) => {
   return `
  productByHandle(handle: "${handle}") {
    id
    title
    description
    handle
    availableForSale
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
                   url
                 }
    images(first: 10) {
      edges {
        node {
          id
          originalSrc
          altText
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
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
   const checkoutId =
      customerResponse?.data?.customer?.lastIncompleteCheckout?.id;
   if (!checkoutId) return;
   const checkoutResponse = await shopifyAPI(checkoutQuery(checkoutId));

   const checkoutNode = checkoutResponse?.data?.node;

   if (!checkoutNode) return;

   return checkoutNode;
};
