import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import Card from "./card";
import PageHeader from "./common/pageHeader";
import { useCards } from "../contexts/cards.context";

const FavCards = ({ search = "" }) => {
   const { allCards, isFavorite } = useCards();
   const { user } = useAuth();

   function displayCards() {
      const favorites = allCards.filter((card) => isFavorite(card));

      if (search) {
         return allCards.map((card) => {
            return <Card card={card} key={card._id} />;
         });
      }

      return favorites.length ? (
         favorites.map((card) => <Card card={card} key={card._id} />)
      ) : (
         <div>
            You don have any favorites yet 😢
            <br />
            <Link to="/">
               Go ahead and choose some by pressing the{" "}
               <i className="bi bi-heart"></i> icon
            </Link>
         </div>
      );
   }

   return (
      <>
         <PageHeader title={"Favorite cards"} />
         <div className="row gap-3">{displayCards()}</div>
      </>
   );
};

export default FavCards;
