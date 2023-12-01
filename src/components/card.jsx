import { Link } from "react-router-dom";

import { useCards } from "../contexts/cards.context";

const Card = ({ card }) => {
   const { user, isFavorite, isMyCard, AddToFavorites, deleteCard } =
      useCards();

   const _id = card?._id || 0;
   const title = card?.title || "title";
   const subtitle = card?.subtitle || "subtitle";
   const image = {
      url:
         card?.image.url ||
         "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
      alt: card?.image.alt || "default image",
   };
   const address = {
      street: card?.address.street || "My-street",
      houseNumber: card?.address.houseNumber || "0",
      city: card?.address.city || "My-city",
      zip: card?.address.zip || "",
   };
   const phone = card?.phone || "0520000000";

   const likes = card?.likes || "likes";
   const user_id = card?.user_id || 0;

   let favorite = null;
   let isItMyCard = null;
   if (_id) {
      favorite = !user ? null : isFavorite(likes);
      isItMyCard = !user ? null : isMyCard(user_id);
   } else {
      favorite = "true";
      isItMyCard = true;
   }

   return (
      <div
         className="card px-0 rounded-4 card-hover justify-content-between"
         style={{ width: "18rem" }}
      >
         <Link
            to={_id && `/business-page/${_id}`}
            className="text-reset text-decoration-none "
         >
            <div
               className="overflow-hidden rounded-top-4"
               style={{ height: "12rem" }}
            >
               <img src={image?.url} className="img-fluid " alt={image.alt} />
            </div>
            <div className="card-body d-flex flex-column justify-content-around">
               <div>
                  <h3 className="card-title">{title}</h3>
                  <h5 className="card-title">{subtitle}</h5>
               </div>
               <div>
                  <ul className="list-group ">
                     <li className="list-group-item">
                        <b>Address:</b>{" "}
                        {[
                           address.street,
                           address.houseNumber,
                           address.city,
                           address.zip,
                        ]
                           .filter(Boolean)
                           .join(" ")}
                     </li>
                     <li className="list-group-item">
                        <b>Phone:</b> {phone}
                     </li>
                  </ul>
               </div>
            </div>
         </Link>

         <div className="card-footer hstack">
            {isItMyCard ||
               (user?.isAdmin && (
                  <>
                     <Link
                        onClick={() => (_id ? deleteCard(_id) : null)}
                        className="card-link"
                     >
                        <i className="bi bi-trash3 text-danger"></i>
                     </Link>
                     <Link
                        to={_id ? `/edit-card/${_id}` : ""}
                        className="card-link"
                     >
                        <i className="bi bi-pencil-square text-warning"></i>
                     </Link>
                  </>
               ))}

            {user && (
               <div className="ms-auto hstack gap-1">
                  <span
                     className={favorite ? "text-danger" : "text-muted"}
                     style={{ fontSize: "0.9rem" }}
                  >
                     {likes?.length || 5}
                  </span>
                  <Link
                     onClick={() => (_id ? AddToFavorites(_id) : null)}
                     className="text-muted"
                  >
                     <i
                        className={`bi bi-heart${
                           favorite ? "-fill text-danger" : ""
                        }`}
                     ></i>
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
};

export default Card;
