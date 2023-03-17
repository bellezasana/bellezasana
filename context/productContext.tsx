import { Product } from "@/utils/products";
import React, {
   createContext,
   useContext,
   useRef,
   useState,
   Dispatch,
   SetStateAction,
   ReactNode,
   Context,
} from "react";

interface ProductContextProps {
   image: string;
   setImage: Dispatch<SetStateAction<string>>;
   selectedVariant: string;
   setSelectedVariant: Dispatch<SetStateAction<string>>;
   showButton: boolean;
   setShowButton: Dispatch<SetStateAction<boolean>>;
   product: Product | undefined;
   setProduct: Dispatch<SetStateAction<Product | undefined>>;
}

const ProductContext = createContext<ProductContextProps | null>(null);

export function useProduct() {
   return useContext(ProductContext as Context<ProductContextProps>);
}

export function ProductProvider({ children }: { children: ReactNode }) {
   const [image, setImage] = useState("");
   const [selectedVariant, setSelectedVariant] = useState("");
   const [showButton, setShowButton] = useState(false);
   const [product, setProduct] = useState<Product>();
   const value = {
      image,
      setImage,
      selectedVariant,
      setSelectedVariant,
      showButton,
      setShowButton,
      product,
      setProduct,
   };

   return (
      <ProductContext.Provider value={value}>
         {children}
      </ProductContext.Provider>
   );
}
