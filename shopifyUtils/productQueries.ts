const variantNode = `
  image {
    altText
    height
    id
    originalSrc
    src
    width
  }
  id
  title
  unitPrice {
    amount
    currencyCode
  }
  product {
    handle
  }
  priceV2 {
    amount
    currencyCode
  }
`;
const productNode = `
  images(first: 10) {
    edges {
      cursor
      node {
        id
        originalSrc
        width
        height
        altText
      }
    }
  }
  featuredImage {
    originalSrc
  }
  handle
  description
  descriptionHtml
  id
  title
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
  variants(first: 10) {
    edges {
      cursor
      node {
        ${variantNode}
      }
    }
  }
`;

export const searchProductsQueryWithCursor = (
   query: string,
   quantity: number,
   cursor: string
) => {
   let qty = Math.max(quantity, 1);

   return `{
      products(first: ${qty}, query: "${query}", after: "${cursor}") {
        edges {
          cursor
          node {
            ${productNode}
          }
        }
        pageInfo {
          endCursor
          hasPreviousPage
          hasNextPage
          startCursor
        }
      }
    }`;
};

export const searchProductsQuery = (
   query: string,
   quantity: number,
   after: string | null = null
) => {
   return `
    products(first: ${quantity}, query: "${query}", after: ${
      after ? `"${after}"` : null
   }) {
      edges {
        cursor
        node {
          ${productNode}
        }
      }
      pageInfo {
        endCursor
        hasPreviousPage
        hasNextPage
        startCursor
      }
    }`;
};
export const productQuery = (handle: string) => {
   return `
  productByHandle(handle: "${handle}") {
    ${productNode}
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
            cursor
            node {
              id
              title
              variant {
                ${variantNode}
              }
              quantity
            }
          }
        }
      }
    }
  `;
};
