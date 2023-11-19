import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import usersService from "../services/usersServices";

const fn_error_context_must_be_used = () => {
   throw new Error("must use authContext provider for consumer to work");
};

export const authContext = createContext({
   user: null,
   userDetails: null,
   login: fn_error_context_must_be_used,
   logout: fn_error_context_must_be_used,
   signUp: fn_error_context_must_be_used,
});

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(usersService.getUser());
   const [userDetails, setUserDetails] = useState(null);

   useEffect(() => {
      const getUserById = async () => {
         if (!user) return;
         const response = await usersService.getUserById(user._id);
         setUserDetails(response.data);
      };
      getUserById();
   }, [user]);

   const refreshUser = () => {
      const user = usersService.getUser();
      setUser(user);
   };

   const login = async (credentials) => {
      const response = await usersService.login(credentials);

      refreshUser();
      return response;
   };

   const logout = () => {
      usersService.logout();
      refreshUser();
   };

   const getUserById = async () => {
      try {
         const response = await usersService.getUserById(
            usersService.getUser()._id
         );
         return response;
      } catch {
         return null;
      }
   };

   return (
      <authContext.Provider
         value={{
            user,
            userDetails,
            login,
            logout,
            signUp: usersService.createUser,
         }}
      >
         {children}
      </authContext.Provider>
   );
};
export const useAuth = () => useContext(authContext);
