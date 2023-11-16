import { Link, NavLink } from "react-router-dom";
import FooterIcon from "./common/footerIcon";
import { useAuth } from "../contexts/auth.context";

const Footer = () => {
   const { user } = useAuth();
   return (
      <div
         id="footer"
         className="row justify-content-center  m-0 border-top py-2  bg-light"
      >
         <div
            className="col-md-5 d-flex
          justify-content-center text-center"
         >
            <FooterIcon
               title="About"
               href="/about"
               bsColorWhenActive="info"
               icon="info-circle"
            />

            {user && (
               <FooterIcon
                  title="Favorites"
                  href="/favorite-cards"
                  bsColorWhenActive="danger"
                  icon="heart"
               />
            )}

            {user?.isBusiness && (
               <FooterIcon
                  title="My Cards"
                  href="/my-cards"
                  bsColorWhenActive="success"
                  icon="person-vcard"
               />
            )}

            {user?.isBusiness && (
               <FooterIcon
                  title="Create card"
                  href="/create-card"
                  bsColorWhenActive="primary"
                  icon="plus-circle"
               />
            )}
         </div>
      </div>
   );
};

export default Footer;
