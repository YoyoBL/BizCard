import { useState } from "react";

export const useColorMode = () => {
   const [colorMode, setColorMode] = useState("dark");

   function switchColorMode() {
      setColorMode((colorMode) => (colorMode === "light" ? "dark" : "light"));
      document.querySelector("body").setAttribute("data-bs-theme", colorMode);

      document.querySelector("#footer").classList.toggle("bg-light");
      document.querySelector("#footer").classList.toggle("bg-dark");
   }

   return {
      colorMode,
      switchColorMode,
   };
};
