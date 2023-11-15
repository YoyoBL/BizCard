import { useState } from "react";

export const useColorMode = () => {
   const [colorMode, setColorMode] = useState("dark");

   function switchColorMode() {
      setColorMode((colorMode) => (colorMode === "light" ? "dark" : "light"));
      document.querySelector("body").setAttribute("data-bs-theme", colorMode);
   }

   return {
      colorMode,
      switchColorMode,
   };
};
