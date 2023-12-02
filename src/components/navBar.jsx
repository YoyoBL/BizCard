import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { useColorMode } from "../hooks/useColorMode";

import "../App.css";
import { useEffect } from "react";

const NavBar = ({ searchValue, onChange = () => {} }) => {
   const { user, userDetails, getUserById } = useAuth();
   const { switchColorMode } = useColorMode();

   useEffect(() => {
      async function getUserProfileImage() {
         if (!user) return;
         try {
            await getUserById();
         } catch {
            return null;
         }
      }
      getUserProfileImage();
   }, [user]);

   const location = useLocation();
   const routesWithSearchInput = ["/", "/favorite-cards", "/my-cards"];
   const shouldShowSearchInput = routesWithSearchInput.includes(
      location.pathname
   );

   return (
      <nav className="navbar navbar-expand-sm shadow-sm mb-3">
         <div className="container">
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
                  <li className="total-center nav-item">
                     <NavLink to="/" className="navbar-brand nav-link">
                        Biz<i className="bi bi-person-vcard"></i>Card
                     </NavLink>
                  </li>
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
                  {user?.isAdmin ? (
                     <li className="nav-item">
                        <NavLink to={"/sandbox"} className="nav-link">
                           SANDBOX
                        </NavLink>
                     </li>
                  ) : (
                     <li className="nav-item">
                        <NavLink to={"/contact"} className="nav-link">
                           Contact
                        </NavLink>
                     </li>
                  )}
               </ul>

               <ul className="navbar-nav ms-auto mb-2 mb-sm-0">
                  {shouldShowSearchInput && (
                     <li>
                        <div className="position-relative d-flex">
                           <input
                              type="text"
                              onChange={(e) => onChange(e.target.value)}
                              value={searchValue}
                              className="form-control"
                              placeholder="Search..."
                           />
                           <i className="bi bi-search position-absolute end-0 p-2"></i>
                        </div>
                     </li>
                  )}

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
                                 className="rounded-circle img-fluid"
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
