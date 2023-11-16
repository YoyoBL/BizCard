import httpService from "./httpServices";

export function createCard(card) {
   return httpService.post("/cards", card);
}

export function getAll() {
   return httpService.get("/cards");
}

function getAllMyCards() {
   return httpService.get("/cards/my-cards");
}

export function getCard(id) {
   return httpService.get(`/cards/${id}`);
}

export function deleteCard(id) {
   return httpService.delete(`/cards/${id}`);
}

export function updateCard(id, card) {
   return httpService.put(`/cards/${id}`, card);
}

export function addCardToFavorites(id) {
   return httpService.patch(`/cards/${id}`);
}

const cardsService = {
   createCard,
   getAll,
   getAllMyCards,
   getCard,
   deleteCard,
   updateCard,
   addCardToFavorites,
};

export default cardsService;
