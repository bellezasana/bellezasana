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
