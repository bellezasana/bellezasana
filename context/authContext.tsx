import React, {
   createContext,
   useContext,
   useState,
   useEffect,
   ReactNode,
   Context,
} from "react";
import {
   createUserWithEmailAndPassword,
   isSignInWithEmailLink,
   sendSignInLinkToEmail,
   signInWithEmailAndPassword,
   signInWithEmailLink,
   signInWithPopup,
   signOut,
   updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/utils/firebaseConfig";
import {
   createCustomer,
   getCustomerAccessToken,
} from "@/utils/shopifyMutations";
import { getCheckoutSession } from "@/utils/shopifyQueries";

interface AuthContextProps {
   setCheckoutSession: (session: any) => void;
   loginWithGoogle: () => Promise<unknown>;
   createUserWithEmail: (
      email: string,
      password: string,
      name: string
   ) => Promise<string | void>;
   signInWithEmail: (email: string, password: string) => Promise<string | void>;
   logout: () => Promise<void>;
   updateCheckoutSession: () => Promise<void>;
   currentUser: any;
   setCurrentUser: (user: any) => void;
   user: any;
   setUser: (user: any) => void;
   accessToken: string;
   setAccessToken: (token: string) => void;
   checkoutSession: any;
   registerUserWithEmailLink: (
      email: string,
      url: string
   ) => Promise<string | void>;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function useAuth() {
   return useContext(AuthContext as Context<AuthContextProps>);
}

export function AuthProvider({ children }: { children: ReactNode }) {
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

   async function registerUserWithEmailLink(email: string, url: string) {
      // If the user is re-entering their email address but already has a code
      if (isSignInWithEmailLink(auth, url) && !!email) {
         // Sign the user in
         try {
            await signInWithEmailLink(auth, email, url);
         } catch (error) {
            return console.error(error);
         }
         return;
      }

      try {
         await sendSignInLinkToEmail(auth, email, {
            url,
            handleCodeInApp: true,
         });
         window.localStorage.setItem("emailForSignIn", email);
      } catch (error) {
         return console.error(error);
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
      registerUserWithEmailLink,
   };

   return (
      <AuthContext.Provider value={value}>
         {loaded && children}
      </AuthContext.Provider>
   );
}
