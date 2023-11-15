import { useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { addCardToFavorites } from "../services/cardsService";

export function useFavoriteCards(card) {
   const [favorite, setFavorite] = useState(false);
   const { user } = useAuth();
   if (card.likes.includes(user._id) && !favorite) {
      setFavorite((favorite) => true);
   }

   async function handleAddFavorite() {
      const response = await addCardToFavorites(card._id);
      setFavorite((favorite) => !favorite);
      console.log(response);
   }
   return { favorite, handleAddFavorite };
}
