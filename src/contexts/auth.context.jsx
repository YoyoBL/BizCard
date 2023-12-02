import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import usersService from "../services/usersServices";

const fn_error_context_must_be_used = () => {
   throw new Error("must use authContext provider for consumer to work");
};

export const authContext = createContext({
   user: null,
   userDetails: null,
   getUserById: fn_error_context_must_be_used,
   login: fn_error_context_must_be_used,
   logout: fn_error_context_must_be_used,
   signUp: fn_error_context_must_be_used,
   updateUser: fn_error_context_must_be_used,
   patchUserStatus: fn_error_context_must_be_used,
   deleteUser: fn_error_context_must_be_used,
});

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(usersService.getUser());
   const [userDetails, setUserDetails] = useState(null);

   useEffect(() => {
      if (!user) return setUserDetails(null);
   }, [user]);

   const getUserById = async () => {
      const response = await usersService.getUserById(user._id);
      setUserDetails(response.data);
   };

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

   const updateUser = async (id, credentials) => {
      const response = await usersService.updateUser(id, credentials);
      setUserDetails(response.data);
   };

   const deleteUser = async (id) => {
      return await usersService.deleteUser(id);
   };

   return (
      <authContext.Provider
         value={{
            user,
            userDetails,
            getUserById,
            login,
            logout,
            updateUser,
            deleteUser,
            patchUserStatus: usersService.patchUserStatus,
            signUp: usersService.createUser,
         }}
      >
         {children}
      </authContext.Provider>
   );
};
export const useAuth = () => useContext(authContext);
