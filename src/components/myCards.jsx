import { Link } from "react-router-dom";
import { useCards } from "../contexts/cards.context";
import Card from "./card";
import PageHeader from "./common/pageHeader";

const MyCards = ({ search = "" }) => {
   const { allCards, isMyCard } = useCards();

   function displayCards() {
      const MyCards = allCards.filter((card) => isMyCard(card.user_id));

      if (search) {
         return allCards.map((card) => {
            return <Card card={card} key={card._id} />;
         });
      }

      return MyCards.length ? (
         MyCards.map((card) => <Card card={card} key={card._id} />)
      ) : (
         <div className="text-center mt-5">
            You don't have any Cards yet 😢
            <br />
            <Link to="/create-card" className="lead">
               Go ahead and create one!⭐
            </Link>
         </div>
      );
   }

   return (
      <>
         <PageHeader title={"My cards"} />
         <div className="row gap-3">{displayCards()}</div>
      </>
   );
};

export default MyCards;
