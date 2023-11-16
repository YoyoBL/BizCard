import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <div
         id="footer"
         className="d-flex
          justify-content-center gap-5 m-0 border-top py-2 text-center bg-light"
      >
         <Link className="d-flex flex-column">
            <i class="bi bi-heart-fill fs-3 "></i>
            <span>Favorites</span>
         </Link>
         <Link className="d-flex flex-column">
            <i class="bi bi-heart-fill fs-3 "></i>
            <span>Favorites</span>
         </Link>
         <Link className="d-flex flex-column">
            <i class="bi bi-heart-fill fs-3 "></i>
            <span>Favorites</span>
         </Link>
      </div>
   );
};

export default Footer;
