import { useEffect } from "react";
import { useAuth } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";

const SignOut = ({ redirect }) => {
   const { logout } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      logout();
      navigate(redirect);
   }, [logout, navigate, redirect]);

   return null;
};

export default SignOut;
