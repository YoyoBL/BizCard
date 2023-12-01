import { NavLink } from "react-router-dom";
import "../../App.css";

const FooterIcon = ({
   title = "",
   href = "/",
   bsColorWhenActive = "white",
   icon = "",
}) => {
   return (
      <NavLink
         to={href}
         className={({ isActive }) =>
            `col d-flex flex-column text-decoration-none footerIcon ${
               isActive ? `text-${bsColorWhenActive}` : "text-white-50"
            }`
         }
      >
         {({ isActive }) => (
            <>
               <i
                  className={`bi bi-${icon}${isActive ? "-fill" : ""} fs-3`}
               ></i>
               <span>{title}</span>
            </>
         )}
      </NavLink>
   );
};

export default FooterIcon;
