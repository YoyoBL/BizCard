import FooterIcon from "./common/footerIcon";
import { useAuth } from "../contexts/auth.context";

const Footer = () => {
   const { user } = useAuth();

   return (
      <div
         id="footer"
         className="row justify-content-center  m-0 border-top py-2  bg-primary"
      >
         <div
            className="col-md-5 d-flex
          justify-content-center text-center"
         >
            <FooterIcon title="All Cards" href="/" icon="house" />

            <FooterIcon title="About" href="/about" icon="info-circle" />

            {user && (
               <FooterIcon
                  title="Favorites"
                  href="/favorite-cards"
                  icon="heart"
               />
            )}

            {user?.isBusiness && (
               <FooterIcon
                  title="My Cards"
                  href="/my-cards"
                  icon="person-vcard"
               />
            )}

            {user?.isBusiness && (
               <FooterIcon
                  title="Create card"
                  href="/create-card"
                  icon="plus-circle"
               />
            )}
            <FooterIcon title="Contact" href="/contact" icon="telephone" />
         </div>
      </div>
   );
};

export default Footer;
