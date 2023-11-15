import httpService from "./httpServices";

// {
//   bizName: Joi.string().min(2).max(255).required(),
//   bizDescription: Joi.string().min(2).max(1024).required(),
//   bizAddress: Joi.string().min(2).max(400).required(),
//   bizPhone: Joi.string()
//     .min(9)
//     .max(10)
//     .required()
//     .regex(/^0[2-9]\d{7,8}$/),
//   bizImage: Joi.string().min(11).max(1024)
// }

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
