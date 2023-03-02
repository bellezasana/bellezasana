import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
interface WithAuthProps {
   children: JSX.Element;
}

const WithAuth = ({ children }: WithAuthProps) => {
   const { currentUser } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (currentUser) return;

      let url = `/auth/login?src=${encodeURIComponent(router.asPath)}`;

      router.push(url);
   }, [router, currentUser]);

   return currentUser && children;
};

export default WithAuth;
