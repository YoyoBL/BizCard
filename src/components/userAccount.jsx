import ListTwoCols from "./common/listTwoCols";
import { Link } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import { useAuth } from "../contexts/auth.context";

const UserAccount = () => {
   const { userDetails } = useAuth();

   if (!userDetails) return;

   const joinedAt = new Date(userDetails.createdAt);

   return (
      <div>
         <PageHeader title={"My profile"} />

         <div className="row mt-3">
            <div className="col-auto col-md-4 hstack">
               <img
                  src={userDetails.image.url}
                  alt={userDetails.image.alt}
                  className="img-fluid rounded-5 p-2 mx-auto"
               />
            </div>
            <div className="col p-3 d-flex flex-column justify-content-center">
               <ListTwoCols
                  title="Name"
                  content={[
                     userDetails.name.first,
                     userDetails.name.middle,
                     userDetails.name.last,
                  ]
                     .filter(Boolean)
                     .join(" ")}
               />
               <ListTwoCols title="Phone" content={userDetails.phone} />
               <ListTwoCols title="Email" content={userDetails.email} />
               <ListTwoCols
                  title="Address"
                  content={[
                     userDetails.address.street,
                     userDetails.address.houseNumber,
                     userDetails.address.city,
                     userDetails.address.zip,
                  ]
                     .filter(Boolean)
                     .join(" ")}
               />
               <ListTwoCols
                  title="Joined at"
                  content={`${joinedAt.getDate()}-${joinedAt.getMonth()}-${joinedAt.getFullYear()}`}
               />
               <ListTwoCols
                  title="Account plan"
                  content={userDetails.isBusiness ? "Business" : "Standard"}
               />
               <Link to={`/edit-profile`}>
                  <button className="btn btn-warning w-100">Edit</button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default UserAccount;
