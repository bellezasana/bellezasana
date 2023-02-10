import React, { createContext, useContext, useState, useEffect } from "react";
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebaseConfig";

const AuthContext = createContext<any>(null);

export function useAuth() {
   return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
   const [currentUser, setCurrentUser] = useState<any>();
   const [user, setUser] = useState();
   const [loaded, setLoaded] = useState(false);

   async function loginWithGoogle() {
      await signInWithPopup(auth, googleProvider);
   }

   async function createUserWithEmail(email: string, password: string) {
      try {
         await createUserWithEmailAndPassword(auth, email, password);
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
   }

   useEffect(() => {
      const unSubscribe = auth.onAuthStateChanged((user) => {
         setCurrentUser(user);
         setLoaded(true);
      });
      return unSubscribe;
   }, []);

   const value = {
      setCurrentUser,
      currentUser,
      loginWithGoogle,
      createUserWithEmail,
      signInWithEmail,
      logout,
      user,
      setUser,
   };

   return (
      <AuthContext.Provider value={value}>
         {loaded && children}
      </AuthContext.Provider>
   );
}
