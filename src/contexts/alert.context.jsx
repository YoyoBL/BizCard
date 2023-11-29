// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AlertContext = createContext({
   alertMessage: null,
   activateAlert: () => {},
   modalContent: {},
   setModalContent: () => {},
});

export const AlertProvider = ({ children }) => {
   const [alertMessage, setAlertMessage] = useState(false);
   const [modalContent, setModalContent] = useState({
      title: "Warning",
      message: "",
      btnText: "Save changes",
      btnColor: "primary",
      fnToDo: () => {},
   });

   useEffect(() => {
      if (!alertMessage) return;

      function getDiv() {
         const div = document.getElementById("alert-message");
         if (div) {
            div.classList.remove("fade-in");

            div.classList.add("fade-out");

            setTimeout(() => {
               setAlertMessage("");
            }, 450);
         }
      }

      setTimeout(() => {
         getDiv();
      }, 2000);
   }, [alertMessage]);

   function activateAlert(message) {
      setAlertMessage(message);
   }

   return (
      <AlertContext.Provider
         value={{
            alertMessage,
            activateAlert,
            modalContent,
            setModalContent,
         }}
      >
         {children}
      </AlertContext.Provider>
   );
};

export const useAlert = () => {
   return useContext(AlertContext);
};
