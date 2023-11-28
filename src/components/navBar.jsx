import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { useColorMode } from "../hooks/useColorMode";

import "../App.css";

const NavBar = ({ value, onChange = () => {} }) => {
   const { user, userDetails } = useAuth();
   const { switchColorMode } = useColorMode();

   return (
      <nav className="navbar navbar-expand-sm  shadow-sm">
         <div className="container">
            <NavLink to="/" className="navbar-brand">
               Biz<i className="bi bi-person-vcard mx-1"></i>Card
            </NavLink>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#main-navbar"
            >
               <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="main-navbar">
               <ul className="navbar-nav nav-underline me-auto mb-2 mb-sm-0">
                  <li className="nav-item">
                     <NavLink to="/about" className="nav-link">
                        About
                     </NavLink>
                  </li>
                  {user && (
                     <li className="nav-item">
                        <NavLink to="/favorite-cards" className="nav-link">
                           Favorites
                        </NavLink>
                     </li>
                  )}
                  {user?.isBusiness && (
                     <li className="nav-item">
                        <NavLink to={"/my-cards"} className="nav-link">
                           My Cards
                        </NavLink>
                     </li>
                  )}
                  {user?.isBusiness && (
                     <li className="nav-item">
                        <NavLink to={"/create-card"} className="nav-link">
                           Create card
                        </NavLink>
                     </li>
                  )}
                  <li className="nav-item">
                     <NavLink to={"/contact"} className="nav-link">
                        Contact
                     </NavLink>
                  </li>
               </ul>

               <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
                  <li>
                     <div className="position-relative d-flex">
                        <input
                           type="text"
                           onChange={(e) => onChange(e.target.value)}
                           value={value}
                           className="form-control"
                           placeholder="Search..."
                        />
                        <i className="bi bi-search position-absolute end-0 p-2"></i>
                     </div>
                  </li>

                  <li className="mx-3">
                     <div className="form-check form-switch pt-2">
                        <input
                           onChange={switchColorMode}
                           className="form-check-input"
                           type="checkbox"
                           role="switch"
                        />
                        <label
                           className="form-check-label"
                           htmlFor="flexSwitchCheckDefault"
                        >
                           <i className="bi bi-moon"></i>
                        </label>
                     </div>
                  </li>
                  {user ? (
                     <>
                        <li
                           className="nav-item total-center mx-3"
                           style={{
                              width: "2rem",
                           }}
                        >
                           <NavLink to="/my-profile">
                              <img
                                 src={userDetails?.image.url}
                                 alt={userDetails?.image.alt}
                                 className="rounded-circle"
                                 style={{
                                    height: "2rem",
                                 }}
                              />
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink
                              to={"/sign-out"}
                              className="nav-link text-danger"
                              style={{
                                 fontSize: "0.9rem",
                              }}
                           >
                              Sign out
                           </NavLink>
                        </li>
                     </>
                  ) : (
                     <>
                        <li className="nav-item">
                           <NavLink to={"/sign-in"} className="nav-link">
                              Sign in
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink
                              to={"/sign-up"}
                              className="nav-link text-primary"
                           >
                              Sign up
                           </NavLink>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default NavBar;
