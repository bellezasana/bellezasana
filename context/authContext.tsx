import React, { createContext, useContext, useState, useEffect } from "react";
import {
   createUserWithEmailAndPassword,
   deleteUser,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile,
} from "firebase/auth";
import { auth, db, googleProvider } from "@/utils/firebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import {
   createCustomer,
   customerAccessTokenCreate,
   getCustomerAccessToken,
} from "@/utils/shopifyMutations";
import { shopifyAPI } from "@/utils/shopifyAPI";
import {
   checkoutQuery,
   customerQuery,
   getCheckoutSession,
} from "@/utils/shopifyQueries";

const AuthContext = createContext<any>(null);

export function useAuth() {
   return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
   const [currentUser, setCurrentUser] = useState<any>();
   const [user, setUser] = useState();
   const [loaded, setLoaded] = useState(false);
   const [accessToken, setAccessToken] = useState("");
   const [checkoutSession, setCheckoutSession] = useState();

   async function loginWithGoogle() {
      try {
         await signInWithPopup(auth, googleProvider);
      } catch (error) {
         console.error(error);
         return error;
      }
   }

   async function createUserWithEmail(
      email: string,
      password: string,
      name: string
   ) {
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         console.log(auth.currentUser);

         if (!auth.currentUser) return;

         await updateProfile(auth.currentUser, {
            displayName: name,
         });

         await createCustomer(email, auth.currentUser.uid);
      } catch (error: any) {
         console.log(error);

         return error.message;
      }
   }

   async function signInWithEmail(email: string, password: string) {
      try {
         await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
         console.log(error);

         return error.message;
      }
   }

   async function logout() {
      await signOut(auth);
      setAccessToken("");
   }

   async function updateCheckoutSession() {
      const session = await getCheckoutSession(accessToken);
      setCheckoutSession(session);
   }

   async function setUserDoc() {
      const userRef = doc(db, "users", currentUser.uid);

      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) return;

      await setDoc(userRef, {
         name: currentUser.displayName || "",
         email: currentUser.email,
         photoURL: currentUser.photoURL,
         lastSeen: serverTimestamp(),
      });
   }

   useEffect(() => {
      const unSubscribe = auth.onAuthStateChanged((user) => {
         setCurrentUser(user);
         setLoaded(true);
      });
      return unSubscribe;
   }, []);

   useEffect(() => {
      if (!currentUser) return;

      const loadCustomerAccessToken = async () => {
         const shopifyAccessToken = await getCustomerAccessToken(
            currentUser.email!,
            currentUser.uid
         );
         setAccessToken(shopifyAccessToken || "");
         if (!shopifyAccessToken) return;
      };
      loadCustomerAccessToken();
   }, [currentUser]);

   const value = {
      setCurrentUser,
      currentUser,
      loginWithGoogle,
      createUserWithEmail,
      signInWithEmail,
      logout,
      accessToken,
      setAccessToken,
      user,
      setUser,
      checkoutSession,
      setCheckoutSession,
      updateCheckoutSession,
   };

   return (
      <AuthContext.Provider value={value}>
         {loaded && children}
      </AuthContext.Provider>
   );
}
