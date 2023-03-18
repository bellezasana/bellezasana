import React, {
   createContext,
   useContext,
   useState,
   Dispatch,
   SetStateAction,
   ReactNode,
   Context,
} from "react";

interface PagionationContextProps {
   pages: (string | null)[];
   setPages: Dispatch<SetStateAction<(string | null)[]>>;
   currentPage: number;
   setCurrentPage: Dispatch<SetStateAction<number>>;
   res: any;
   setRes: Dispatch<SetStateAction<any>>;
}

const PagionationContext = createContext<PagionationContextProps | null>(null);

export function usePagination() {
   return useContext(PagionationContext as Context<PagionationContextProps>);
}

export function PaginationProvider({ children }: { children: ReactNode }) {
   const [pages, setPages] = useState<(string | null)[]>([null]);
   const [currentPage, setCurrentPage] = useState(0);
   const [res, setRes] = useState<any>();

   const value = {
      pages,
      setPages,
      currentPage,
      setCurrentPage,
      res,
      setRes,
   };

   return (
      <PagionationContext.Provider value={value}>
         {children}
      </PagionationContext.Provider>
   );
}
