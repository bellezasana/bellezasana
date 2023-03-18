import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import {
   isSignInWithEmailLink,
   signInWithEmailLink,
   updateProfile,
} from "firebase/auth";
import { auth } from "@/utils/firebaseConfig";

function RegisterForm() {
   const router = useRouter();
   const [inputName, setInputName] = useState("");
   const [email, setEmail] = useState("");
   const [error, setError] = useState("");
   const { currentUser, registerUserWithEmailLink } = useAuth();
   const [routerQuerySrc, setRouterQuerySrc] = useState("");

   useEffect(() => {
      const signTheUserIn = async () => {
         const saved_email = window.localStorage.getItem("emailForSignIn");
         if (
            isSignInWithEmailLink(auth, window.location.href) &&
            !!saved_email
         ) {
            let url = window.location.href;

            try {
               await signInWithEmailLink(auth, saved_email, url);
               window.localStorage.removeItem("emailForSignIn");
            } catch (error) {}
         }
      };
      signTheUserIn();
   }, []);

   useEffect(() => {
      const { src, name } = router.query;
      if (typeof src === "string") {
         setRouterQuerySrc(`?src=${encodeURIComponent(src)}`);
      }

      if (!currentUser) return;

      const setProfileInfo = async () => {
         if (typeof name === "string") {
            await updateProfile(currentUser, { displayName: name });
         }
      };
      setProfileInfo();

      router.replace(typeof src === "string" ? src : "/");
   }, [router, currentUser]);

   const registerUser = async (e: FormEvent) => {
      e.preventDefault();

      let url = window.location.href;
      url = inputName ? url + `&name=${inputName}` : url;

      await router.replace(url);

      let signInError = await registerUserWithEmailLink(email, url);

      if (signInError) {
         console.log(signInError);
         signInError = signInError.split(":")[1];
         setError(signInError);
         return;
      }
   };

   return (
      <div className="w-full pt-4">
         <div className="flex flex-col items-center w-full ">
            <div
               className={`${
                  error === "" ? "hidden" : "flex"
               } w-[90%] bg-[#ffc0c0]  justify-center`}
            >
               <p className="p-1 text-sm text-black">{error}</p>
            </div>
            <h1 className="mb-4 text-3xl font-bold">Registrate</h1>

            <form
               onSubmit={registerUser}
               className="flex flex-col items-center w-full"
            >
               <div className="authInputBox">
                  <input
                     type="text"
                     name="name"
                     required
                     value={inputName}
                     onChange={(e) => setInputName(e.target.value)}
                  />
                  <label htmlFor="name">Nombre Completo:</label>
               </div>
               <div className="authInputBox">
                  <input
                     type="text"
                     name="email"
                     required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Correo:</label>
               </div>

               <div className="w-[90%] flex flex-col items-center mx-auto">
                  <button
                     type="submit"
                     className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:scale-[1.005]"
                  >
                     Enviar
                  </button>
               </div>
            </form>
         </div>
         <div className="flex gap-1 p-4 text-sm">
            <p>¿Tienes una cuenta?</p>
            <Link
               href={`/auth/login${routerQuerySrc}`}
               className="text-blue-400 underline"
            >
               Inicia sesion
            </Link>
         </div>
      </div>
   );
}

export default RegisterForm;
