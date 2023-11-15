import { useFavoriteCards } from "../hooks/useCards";
import PageHeader from "./common/pageHeader";

const FavCards = () => {
   const favCards = useFavoriteCards();
   return (
      <>
         <PageHeader title={"Favorite cards"} />
         <div className="row"></div>
      </>
   );
};

export default FavCards;
