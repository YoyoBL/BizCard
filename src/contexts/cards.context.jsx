import { createContext, useContext } from "react";

import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";
import { useAuth } from "./auth.context";

const cardsContext = createContext({});

export const CardsProvider = ({ children }) => {
   const { user } = useAuth();
   const [allCards, setAllCards] = useState([]);

   async function getAllCards() {
      const { data } = await cardsService.getAll();
      setAllCards(data);
   }

   useEffect(() => {
      getAllCards();
   }, []);

   function refreshCards() {
      getAllCards();
   }

   function isFavorite(card) {
      return card.likes.includes(user._id);
   }

   async function AddToFavorites(id) {
      const response = await cardsService.addCardToFavorites(id);
      refreshCards();
   }

   return (
      <cardsContext.Provider value={{ allCards, isFavorite, AddToFavorites }}>
         {children}
      </cardsContext.Provider>
   );
};

export const useCards = () => useContext(cardsContext);
