import { useAuth } from "../contexts/auth.context";
import ListTwoCols from "./common/listTwoCols";
import { Link } from "react-router-dom";

const ProfileCard = ({ signUpFields = null }) => {
   const { userDetails } = useAuth();

   function userDetailsAndDefaults() {
      const image = {
         url:
            signUpFields?.image.url ||
            userDetails?.image.url ||
            "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
         alt:
            signUpFields?.image.alt ||
            userDetails?.image.alt ||
            "Default user avatar",
      };
      const name = {
         first: signUpFields?.name.first || userDetails?.name.first,
         middle: signUpFields?.name.middle || userDetails?.name.middle,
         last: signUpFields?.name.last || userDetails?.name.last,
      };
      const phone = signUpFields?.phone || userDetails?.phone;
      const email = signUpFields?.email || userDetails?.email;
      const address = {
         street: signUpFields?.address.street || userDetails?.address.street,
         houseNumber:
            signUpFields?.address.houseNumber ||
            userDetails?.address.houseNumber,
         city: signUpFields?.address.city || userDetails?.address.city,
         zip: signUpFields?.address.zip || userDetails?.address.zip,
      };
      const isBusiness = signUpFields?.isBusiness || userDetails?.isBusiness;

      const joinedAt = new Date(userDetails?.createdAt || new Date());

      return {
         image,
         name,
         phone,
         email,
         address,
         isBusiness,
         joinedAt,
      };
   }
   const { image, name, phone, email, address, isBusiness, joinedAt } =
      userDetailsAndDefaults();

   console.log(image);

   return (
      <div className="row flex-column col mx-auto col-md-7">
         <div
            className="col-md-5 mx-auto overflow-hidden"
            style={{ maxHeight: "300px" }}
         >
            <img
               src={image.url}
               alt={image.alt}
               className="img-fluid rounded-5 p-2 mx-auto"
            />
         </div>
         <div className="col p-3 d-flex flex-column justify-content-center">
            <ListTwoCols
               title="Name"
               content={[name.first, name.middle, name.last]
                  .filter(Boolean)
                  .join(" ")}
            />
            <ListTwoCols title="Phone" content={phone} />
            <ListTwoCols title="Email" content={email} />
            <ListTwoCols
               title="Address"
               content={[
                  address.street,
                  address.houseNumber,
                  address.city,
                  address.zip,
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
               content={isBusiness ? "Business" : "Standard"}
            />
         </div>
      </div>
   );
};

export default ProfileCard;
