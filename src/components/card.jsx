import { Link } from "react-router-dom";

const Card = ({ card: { _id, title, description, address, phone, image } }) => {
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
               <i class="bi bi-trash3 text-danger"></i>
            </Link>
            <Link to={`/my-cards/edit/${_id}`} className="card-link">
               <i class="bi bi-pencil-square text-warning"></i>
            </Link>
         </div>
      </div>
   );
};

export default Card;
