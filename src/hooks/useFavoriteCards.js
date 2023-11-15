import { useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { addCardToFavorites } from "../services/cardsService";

export function useFavoriteCards(card) {
   const { user } = useAuth();
   const [favorite, setFavorite] = useState(card.likes.includes(user._id));

   async function handleAddFavorite() {
      const response = await addCardToFavorites(card._id);
      setFavorite((favorite) => !favorite);
   }

   return { favorite, handleAddFavorite };
}
