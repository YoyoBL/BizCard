import PageHeader from "./common/pageHeader";
import Card from "./card";
import { useCards } from "../contexts/cards.context";
import { useEffect } from "react";

const Home = ({ search = "" }) => {
   const { allCards, getAllCardsFromApi } = useCards();

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
         <PageHeader
            title="Welcome"
            description="Here are all the cards our users created"
         />

         <div className="row mt-3 gap-3">
            {!allCards.length ? <p>no cards...</p> : displayCards()}
         </div>
      </>
   );
};

export default Home;
