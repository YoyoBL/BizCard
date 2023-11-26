import httpServices from "./httpServices";
import httpService from "./httpServices";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

refreshTokenHeader();

export function refreshTokenHeader() {
   httpService.setCommonHeader("x-auth-token", getJWT());
}

export function createUser(user) {
   return httpService.post("/users", user);
}

export async function login(credentials) {
   const response = await httpService.post("/users/login", credentials);

   localStorage.setItem(TOKEN_KEY, response.data);
   refreshTokenHeader();
   return response;
}

export function logout() {
   localStorage.removeItem(TOKEN_KEY);
   refreshTokenHeader();
}

export function getJWT() {
   return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
   const token = getJWT();
   return jwtDecode(token);
}

function getUserById(id) {
   return httpServices.get(`users/${id}`);
}

function updateUser(id, values) {
   return httpServices.put(`users/${id}`, values);
}

const usersService = {
   createUser,
   login,
   logout,
   getUser,
   getUserById,
   updateUser,
   getJWT,
};

export default usersService;
