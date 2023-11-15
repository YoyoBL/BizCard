import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";

export function useGetAllCards() {
   const [allCards, setAllCards] = useState([]);
   useEffect(() => {
      const getCards = async () => {
         const { data } = await cardsService.getAll();
         setAllCards(data);
      };

      getCards();
   }, []);
   return allCards;
}

export function useFavoriteCards() {
   const [favCards, setFavCards] = useState([]);
   useEffect(() => {
      const getCards = async () => {
         try {
            const { data } = await cardsService.getAllMyCards();
            setFavCards(data);
         } catch (err) {
            setFavCards(err);
         }
      };

      getCards();
   }, []);
   return favCards;
}
