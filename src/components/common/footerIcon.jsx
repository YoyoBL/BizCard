import { NavLink } from "react-router-dom";

const FooterIcon = ({
   title = "",
   href = "/",
   bsColorWhenActive = "primary",
   icon = "",
}) => {
   return (
      <NavLink
         to={href}
         className={({ isActive }) =>
            `col d-flex flex-column text-decoration-none ${
               isActive ? `text-${bsColorWhenActive}` : "text-black-50"
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
