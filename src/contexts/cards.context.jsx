import { createContext, useContext } from "react";

import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";
import { useAuth } from "./auth.context";

const cardsContext = createContext({
   allCards: () => {},
   getAllCardsFromApi: () => {},
   isFavorite: () => {},
   isMyCard: () => {},
   AddToFavorites: () => {},
});

export const CardsProvider = ({ children }) => {
   const { user } = useAuth();
   const [allCards, setAllCards] = useState([]);

   async function getAllCardsFromApi() {
      const { data } = await cardsService.getAll();
      setAllCards(data);
   }

   useEffect(() => {
      getAllCardsFromApi();
   }, []);

   function isFavorite(likes) {
      return likes.includes(user._id);
   }

   function isMyCard(userId) {
      return userId === user._id;
   }

   async function AddToFavorites(id) {
      const updatedCards = allCards.map((card) => {
         if (card._id === id) {
            if (isFavorite(card)) {
               return {
                  ...card,
                  likes: card.likes.filter((like) => like !== user._id),
               };
            }
            return { ...card, likes: [...card.likes, user._id] };
         }
         return card;
      });
      setAllCards(updatedCards);
      const response = await cardsService.addCardToFavorites(id);
   }

   return (
      <cardsContext.Provider
         value={{
            user,
            allCards,
            isFavorite,
            isMyCard,
            AddToFavorites,
            getAllCardsFromApi,
         }}
      >
         {children}
      </cardsContext.Provider>
   );
};

export const useCards = () => useContext(cardsContext);
