import { Link } from "react-router-dom";

import { useCards } from "../contexts/cards.context";

const Card = ({
   card: { _id, title, subtitle, address, phone, image, likes, user_id },
}) => {
   const { user, isFavorite, isMyCard, AddToFavorites, deleteCard } =
      useCards();

   const favorite = !user ? null : isFavorite(likes);
   const isItMyCard = !user ? null : isMyCard(user_id);

   return (
      <div className="card px-0 rounded-4" style={{ width: "18rem" }}>
         <div
            className="overflow-hidden rounded-top-4"
            style={{ height: "12rem" }}
         >
            <img src={image.url} className="img-fluid " alt={image.alt} />
         </div>

         <div className="card-body d-flex flex-column justify-content-around">
            <div>
               <h3 className="card-title">{title}</h3>
               <h5 className="card-title">{subtitle}</h5>
            </div>

            <div>
               <ul className="list-group ">
                  <li className="list-group-item">
                     <b>Address:</b> {address.street} {address.houseNumber}
                     {address?.state} {address.city}
                  </li>
                  <li className="list-group-item">
                     <b>Phone:</b> {phone}
                  </li>
               </ul>
            </div>
         </div>

         <div className="card-footer hstack">
            {isItMyCard && (
               <Link onClick={() => deleteCard(_id)} className="card-link">
                  <i className="bi bi-trash3 text-danger"></i>
               </Link>
            )}
            {isItMyCard && (
               <Link to={`/edit-card/${_id}`} className="card-link">
                  <i className="bi bi-pencil-square text-warning"></i>
               </Link>
            )}

            {user && (
               <div className="ms-auto hstack gap-1">
                  <span
                     className={favorite ? "text-danger" : "text-muted"}
                     style={{ fontSize: "0.9rem" }}
                  >
                     {likes.length}
                  </span>
                  <Link
                     onClick={() => AddToFavorites(_id)}
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
