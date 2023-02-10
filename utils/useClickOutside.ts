import { RefObject, useEffect } from "react";

export const useClickOutside = (
   ref: RefObject<any> | RefObject<any>[],
   handler: any
) => {
   useEffect(() => {
      const listener = (event: any) => {
         if (event.targetTouches !== undefined) return;

         if (ref instanceof Array) {
            for (let i = 0; i < ref.length; i++) {
               const el = ref[i]?.current;
               if (!el || el.contains(event.target)) {
                  return;
               }
            }
            handler(event);
         } else {
            const el = ref?.current;

            if (!el || el.contains(event.target)) {
               return;
            }

            handler(event);
         }
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
         document.removeEventListener("mousedown", listener);
         document.removeEventListener("touchstart", listener);
      };
   }, [ref, handler]);
};
