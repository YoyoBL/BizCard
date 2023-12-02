import PageHeader from "./common/pageHeader";
import Card from "./card";
import { useCards } from "../contexts/cards.context";
import { useNavigate } from "react-router-dom";

const Home = ({ search = "" }) => {
   const { allCards, user } = useCards();
   const navigate = useNavigate();

   function displayCards() {
      if (search) {
         return allCards
            .filter((card) => card.title.includes(search))
            .map((card) => {
               return <Card card={card} key={card._id} />;
            });
      }
      return allCards.map((card) => <Card card={card} key={card._id} />);
   }

   return (
      <>
         {user && (
            <PageHeader
               title="Welcome"
               description="Here are all the cards our users created"
            />
         )}

         {!user && (
            <div className="px-4 py-5 my-5 text-center shadow">
               <h1 className="display-5 fw-semibold text-primary">
                  Welcome to{" "}
                  <div className="d-inline-block">
                     Biz<i className="bi bi-person-vcard mx-1"></i>Card
                  </div>
               </h1>
               <div className="col-lg-6 mx-auto">
                  <p className="lead mb-4">
                     Unlock the full potential of your online presence! <br />
                     Join our dynamic community and dive into the world of
                     digital visit cards.
                     <div className="fs-3 my-1">
                        {" "}
                        Sign up now to create your profile.
                     </div>
                     Whether you're a Standard user saving favorite cards or a
                     Business user crafting your own, we have the perfect
                     subscription for you. <br />
                     Let's connect and make lasting impressions together!
                  </p>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                     <button
                        type="button"
                        onClick={() => navigate("/sign-up")}
                        className="btn btn-primary btn-lg px-4 gap-3"
                     >
                        Sign up
                     </button>
                     <button
                        type="button"
                        onClick={() => navigate("/sign-in")}
                        className="btn btn-outline-secondary btn-lg px-4"
                     >
                        Sign in
                     </button>
                  </div>
               </div>
            </div>
         )}

         <div className="row justify-content-evenly mt-3 gap-3">
            {!allCards?.length ? <p>no cards...</p> : displayCards()}
         </div>
      </>
   );
};

export default Home;
