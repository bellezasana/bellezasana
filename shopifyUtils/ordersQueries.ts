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
