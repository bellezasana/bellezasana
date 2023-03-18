import Image from "next/image";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "@/context/authContext";
import { auth, storage } from "@/utils/firebaseConfig";
import {
   deleteObject,
   getDownloadURL,
   ref,
   uploadBytes,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";

function ProfilePhoto() {
   const { currentUser, setCurrentUser } = useAuth();
   const [image, setImage] = useState<any>();
   const imageHandler = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      setImage(file);

      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
   };

   const deleteImage = async () => {
      try {
         await updateProfile(auth.currentUser!, {
            photoURL: null,
         });
         setCurrentUser({ ...currentUser, photoURL: null });
      } catch (error) {
         console.error(error);
      }

      if (currentUser.photoURL) {
         try {
            const photoRef = ref(storage, currentUser.photoURL);
            await deleteObject(photoRef);
         } catch (error) {}
      }
   };

   useEffect(() => {
      // console.log(currentUser.photoURL);
      if (!image) return;

      const updateImage = async () => {
         const photoRef = ref(storage, `/profilePhotos/${image?.name}`);
         await uploadBytes(photoRef, image);

         let photoURL = await getDownloadURL(photoRef);

         await updateProfile(auth.currentUser!, {
            photoURL,
         });
         setCurrentUser({ ...currentUser, photoURL });
         setImage(null);
      };
      updateImage();
   }, [image, currentUser, setCurrentUser]);

   return (
      <div className="flex flex-col items-center w-full ">
         <div className="mb-4 overflow-hidden rounded-full !aspect-square w-[15rem]">
            {currentUser.photoURL && currentUser.photoURL !== "" ? (
               <Image
                  src={currentUser.photoURL}
                  alt="Foto de perfil"
                  fill
                  className="!relative w-full h-full"
               />
            ) : (
               <PersonIcon className="text-gray-700" />
            )}
         </div>
         <div className="flex whitespace-nowrap">
            <label className="px-6 py-1 mr-2 text-gray-100 rounded cursor-pointer bg-green-dark hover:drop-shadow-md">
               <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
               />
               Agregar foto
            </label>
            <button onClick={deleteImage} className="hover:text-red-500">
               Eliminar foto
            </button>
         </div>
      </div>
   );
}

export default ProfilePhoto;
