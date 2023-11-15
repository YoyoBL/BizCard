import { Link } from "react-router-dom";
import { addCardToFavorites } from "../services/cardsService";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth.context";

const Card = ({
   card: { _id, title, description, address, phone, image, likes },
}) => {
   const [favorite, setFavorite] = useState(false);
   const { user } = useAuth();
   if (likes.includes(user._id) && !favorite) {
      setFavorite((favorite) => true);
   }

   async function handleFavorite() {
      const response = await addCardToFavorites(_id);
      setFavorite((favorite) => !favorite);
      console.log(response);
   }

   return (
      <div className="card px-0" style={{ width: "18rem" }}>
         <div
            className="overflow-hidden total-center"
            style={{ height: "12rem" }}
         >
            <img src={image.url} className="img-fluid h-100" alt={image.alt} />
         </div>

         <div className="card-body d-flex flex-column justify-content-around">
            <div>
               <h5 className="card-title">{title}</h5>
               <p className="card-text">{description}</p>
            </div>

            <div>
               <ul className="list-group ">
                  <li className="list-group-item">{address.city}</li>
                  <li className="list-group-item">{phone}</li>
               </ul>
            </div>
         </div>
         <div className="card-footer">
            <Link to={`/my-cards/delete/${_id}`} className="card-link">
               <i className="bi bi-trash3 text-danger"></i>
            </Link>
            <Link to={`/my-cards/edit/${_id}`} className="card-link">
               <i className="bi bi-pencil-square text-warning"></i>
            </Link>
            <Link to={`/my-cards/edit/${_id}`} className="card-link"></Link>
            <Link onClick={handleFavorite} className="text-muted">
               {favorite ? (
                  <i className="bi bi-heart-fill text-danger"></i>
               ) : (
                  <i className="bi bi-heart"></i>
               )}
            </Link>
         </div>
      </div>
   );
};

export default Card;
