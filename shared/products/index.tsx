import React from "react";
import Card from "./card";

const products = [
   {
      id: "1",
      name: "PRODUCTO",
      description: "",
      price: 0,
      photoURL: "/products/product1.png",
   },
   {
      id: "2",
      name: "PRODUCTO",
      description: "",
      price: 0,
      photoURL: "/products/product2.png",
   },
   {
      id: "3",
      name: "PRODUCTO",
      description: "",
      price: 0,
      photoURL: "/products/product3.png",
   },
];

function Products() {
   return (
      <div className="flex justify-center w-full my-2">
         <div className="flex flex-wrap justify-center w-full mx-auto">
            {products.map((product) => (
               <Card key={product.id} product={product} />
            ))}
         </div>
      </div>
   );
}

export default Products;
