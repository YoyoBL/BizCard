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
   deleteCard: () => {},
});

export const CardsProvider = ({ children }) => {
   const { user } = useAuth();
   const [allCards, setAllCards] = useState([]);

   async function getAllCardsFromApi() {
      const { data } = await cardsService.getAll().catch(() => {});
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
            if (isFavorite(card.likes)) {
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

      await cardsService.addCardToFavorites(id).catch(() => {});
   }

   async function deleteCard(cardId) {
      await cardsService.deleteCard(cardId).catch(() => {});
      getAllCardsFromApi();
   }

   return (
      <cardsContext.Provider
         value={{
            user,
            allCards,
            getAllCardsFromApi,
            isFavorite,
            isMyCard,
            AddToFavorites,
            deleteCard,
         }}
      >
         {children}
      </cardsContext.Provider>
   );
};

export const useCards = () => useContext(cardsContext);
