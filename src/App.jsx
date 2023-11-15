import "./App.css";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import About from "./components/about";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/signIn";
import SignOut from "./components/sign-out";
import Home from "./components/home";
import ProtectedRoute from "./components/protectedRoute";
import CardsCreate from "./components/cardsCreate";
import CardDelete from "./components/cardDelete";
import { useState } from "react";
import FavCards from "./components/favCards";

function App() {
   const [searchInput, setSearchInput] = useState("");

   function handleSearchInputChange(e) {
      setSearchInput(e);
   }
   return (
      <div className="app d-flex flex-column min-vh-100">
         <header className="pb-3">
            <NavBar value={searchInput} onChange={handleSearchInputChange} />
         </header>
         <main className="flex-fill container">
            <Routes>
               <Route path="/" element={<Home search={searchInput} />} />
               <Route path="/about" element={<About />} />
               <Route
                  path="/my-cards"
                  element={
                     <ProtectedRoute onlyBiz>
                        <Home />
                     </ProtectedRoute>
                  }
               />
               <Route path="/favorite-cards" element={<FavCards />} />
               <Route
                  path="/create-card"
                  element={
                     <ProtectedRoute onlyBiz>
                        <CardsCreate />
                     </ProtectedRoute>
                  }
               />
               <Route
                  path="/my-cards/delete/:id"
                  element={
                     <ProtectedRoute onlyBiz>
                        <CardDelete />
                     </ProtectedRoute>
                  }
               />
               <Route path="/sign-in" element={<SignIn redirect="/" />} />
               <Route
                  path="/sign-up"
                  element={<SignUp redirect="/sign-in" />}
               />

               <Route path="/sign-out" element={<SignOut redirect="/" />} />
            </Routes>
         </main>
         <footer>
            <Footer />
         </footer>
      </div>
   );
}

export default App;
