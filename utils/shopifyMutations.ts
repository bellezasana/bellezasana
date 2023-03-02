import { shopifyAPI } from "./shopifyAPI";

export const createCustomer = (email: string, password: string) => {
   return `
    customerCreate(input: {email: "${email}", password: "${password}"}) {
    customer {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
    userErrors {
      message
      field
    }
  }
  `;
};
export const customerAccessTokenCreate = (email: string, password: string) => {
   return `
customerAccessTokenCreate(input: {email: "${email}", password: "${password}"}) {
    customerAccessToken {
      expiresAt
      accessToken
    }
    customerUserErrors {
      code
      message
      field
    }
    userErrors {
      field
      message
    }
  }
  `;
};

export const customerIsUnidentified = (res: any) => {
   if (
      res.data.customerAccessTokenCreate.customerUserErrors?.[0]?.code ===
      "UNIDENTIFIED_CUSTOMER"
   ) {
      return true;
   }
   return false;
};

export const getCustomerAccessToken = async (
   email: string,
   password: string
) => {
   const customerAccessTokenMutation = customerAccessTokenCreate(
      email,
      password
   );
   let accessTokenResponse = await shopifyAPI(
      customerAccessTokenMutation,
      true
   );
   // console.log(accessTokenResponse);
   if (customerIsUnidentified(accessTokenResponse)) {
      console.log("Customer is unidentified");

      // Create a new customer
      const createCustomerMutation = createCustomer(email, password);
      const customerResponse = await shopifyAPI(createCustomerMutation, true);
      const customerUserErrors =
         customerResponse.data.customerCreate.customerUserErrors;
      if (customerUserErrors.length > 0) {
         console.error(customerUserErrors[0].message);
         return;
      }
   }
   // Get the access token
   accessTokenResponse = await shopifyAPI(customerAccessTokenMutation, true);
   const AccessTokenUserErrors =
      accessTokenResponse.data.customerAccessTokenCreate.customerUserErrors;
   if (AccessTokenUserErrors.length > 0) {
      console.error(AccessTokenUserErrors[0].message);
      return;
   }
   return accessTokenResponse.data.customerAccessTokenCreate.customerAccessToken
      .accessToken;
};

export const checkoutCreate = (email: string) => {
   return `
    checkoutCreate(
    input: {buyerIdentity: {countryCode: CO}, email: "${email}"}
    ) {
      userErrors {
        message
        field
      }
      checkoutUserErrors {
        message
        field
        code
      }
      checkout {
        id
        email
      }
    }
    `;
};

export const checkoutLineItemAdd = (
   checkoutId: string,
   variantId: string,
   quantity: number
) => {
   return `
    checkoutLineItemsAdd(
    checkoutId: "${checkoutId}",
    lineItems: {variantId: "${variantId}", quantity: ${quantity}}
    ) {
      userErrors {
        message
        field
      }
      checkoutUserErrors {
        message
        field
        code
      }
      checkout {
        id
        email
      }
    }
    `;
};
export const addProductToCheckout = async (
   checkoutId: string,
   variantId: string,
   quantity: number,
   email: string
) => {
   const mutation = checkoutLineItemAdd(checkoutId, variantId, quantity);
   const response = await shopifyAPI(mutation, true);

   // console.log(response);

   const errorExists = response.errors > 0;
   if (!errorExists) return response;

   const checkoutMutation = checkoutCreate(email);

   const checkoutResponse = await shopifyAPI(checkoutMutation, true);

   const newCheckoutId = checkoutResponse.data.checkoutCreate.checkout.id;

   const newMutation = checkoutLineItemAdd(newCheckoutId, variantId, quantity);
   const newResponse = await shopifyAPI(newMutation, true);
   return newResponse;
};

export const checkoutLineItemRemove = (
   checkoutId: string,
   lineItemId: string
) => {
   return `
      checkoutLineItemsRemove(
      checkoutId: "${checkoutId}",
      lineItemIds: ["${lineItemId}"]
      ) {
         userErrors {
            message
            field
         }
         checkoutUserErrors {
            message
            field
            code
         }
         checkout {
            id
            email
         }
      }`;
};

export const checkoutLineItemUpdate = (
   checkoutId: string,
   lineItemId: string,
   quantity: number
) => {
   return `
      checkoutLineItemsUpdate(
      checkoutId: "${checkoutId}",
      lineItems: [{id: "${lineItemId}", quantity: ${quantity}}]
      ) {
         userErrors {
            message
            field
         }
         checkoutUserErrors {
            message
            field
            code
         }
         checkout {
            id
            email
         }
      }
      `;
};

export const updateQuantityOfLineItem = async (
   checkoutId: string,
   lineItemId: string,
   quantity: number
) => {
   const mutation = checkoutLineItemUpdate(checkoutId, lineItemId, quantity);
   const response = await shopifyAPI(mutation, true);
   return response;
};
