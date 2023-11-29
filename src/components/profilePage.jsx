import { Link } from "react-router-dom";
import PageHeader from "./common/pageHeader";
import ProfileCard from "./profileCard";

const ProfilePage = () => {
   return (
      <>
         <PageHeader title={"My profile"} />

         <div className="vstack">
            <ProfileCard />
            <div className="col-md-7 mx-auto">
               <Link to={`/edit-profile`} className="">
                  <button className="btn btn-warning w-100">Edit</button>
               </Link>
            </div>
         </div>
      </>
   );
};

export default ProfilePage;
