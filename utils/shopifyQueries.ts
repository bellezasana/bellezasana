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
//export the first 10 products
export const productsQuery = () => {
   return `
 products(first: 10) {
    edges {
      node {
        id
        title
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

export const ordersQuery = (customerAccessToken: string) => {
   return `
    customer(customerAccessToken: "${customerAccessToken}") {
      orders(first: 10) {
        edges {
          node {
            id
            name
            totalPriceV2 {
              amount
              currencyCode
            }
            processedAt
            lineItems(first: 10) {
              edges {
                node {
                  
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
      }
    }
  `;
};
export const ordersWithPaginationQuery = (
   customerAccessToken: string,
   cursor: string
) => {
   return `
      customer(customerAccessToken: "${customerAccessToken}") {
        orders(first: 10, after: "${cursor}") {
          totalCount
          edges {
            node {
              id
              name
              totalPriceV2 {
                amount
                currencyCode
              }
              processedAt
              lineItems(first: 10) {
                edges {
                  node {
                    
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
        }
      }
    `;
};
export const ordersQueryWithCursorNoLineItems = (
   customerAccessToken: string
   //  cursor: string
) => {
   return `
      customer(customerAccessToken: "${customerAccessToken}") {
        orders(first: 10) {
          totalCount
          edges {
            node {
              orderNumber
              fulfillmentStatus
              id
              name
              totalPriceV2 {
                amount
                currencyCode
              }
              processedAt
              
            }
          }
        }
      }
    `;
};

export const getOrderByNumber = (
   customerAccessToken: string,
   orderNumber: string
) => {
   return `
    customer(customerAccessToken: "${customerAccessToken}") {
      orders(first: 1, query: "${orderNumber}") {
        totalCount
        edges {
          node {
            id
            name
            totalPriceV2 {
              amount
              currencyCode
            }
            processedAt
            lineItems(first: 10) {
              edges {
                node {
                  
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
    }`;
};

export const searchProductsQuery = (query: string) => {
   return `
    products(first: 10, query: "${query}") {
      edges {
        node {
          id
          title
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
export const orderNodeQuery = (orderId: string) => {
   return `
      node(id: "${orderId}") {
        ... on Order {
          id
          name
          totalPriceV2 {
            amount
            currencyCode
          }
          processedAt
          lineItems(first: 10) {
            edges {
              node {
                
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
