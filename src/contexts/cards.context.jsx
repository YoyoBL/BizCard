import { createContext, useContext } from "react";

import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";
import { useAuth } from "./auth.context";

const cardsContext = createContext({});

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

   // function refreshCards() {
   //    getAllCards();
   // }

   function isFavorite(card) {
      return card.likes.includes(user._id);
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
         value={{ user, allCards, isFavorite, AddToFavorites }}
      >
         {children}
      </cardsContext.Provider>
   );
};

export const useCards = () => useContext(cardsContext);
