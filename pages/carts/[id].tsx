import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function Cart() {
   const router = useRouter();
   const [cartId, setCartId] = useState("");
   useEffect(() => {
      // const { id } = router.query;
      // if (typeof id !== "string") return;

      let path = router.asPath;

      const basePath = "/cart/";
      path = path.slice(basePath.length);

      // setCartId(id);
      console.log(path);
   }, [router]);

   return <div>Cart</div>;
}

export default Cart;
