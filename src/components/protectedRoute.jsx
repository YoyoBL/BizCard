import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

const ProtectedRoute = ({ children, onlyBiz = false, OnlyAdmin = false }) => {
   const { user } = useAuth();

   if (!user || (onlyBiz && !user.isBusiness) || (OnlyAdmin && !user.isAdmin)) {
      return <Navigate to={"/sign-in"} />;
   }

   return children;
};

export default ProtectedRoute;
