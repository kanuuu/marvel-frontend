import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//pages
import Home from "./pages/Home/index.js";
import Characters from "./pages/Characters/index.js";
import ComicsSearch from "./pages/ComicsSearch/index.js";
import CharactersSearch from "./pages/CharactersSearch/index.js";

//components
import Navbar from "./components/Navbar";

//icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faBookOpen, faMask } from "@fortawesome/free-solid-svg-icons";
library.add(faStar, faBookOpen, faMask);

const App = () => {
  const [favorites, setFavorites] = useState(Cookies.get("favorites") || []);

  const addToFav = (id) => {
    const newFav = [...favorites, { id: id }];

    setFavorites(newFav);
    Cookies.set("favorites", JSON.stringify(favorites));
  };
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home addToFav={addToFav} favorites={favorites} />}
        />
        <Route
          path="/character/:id"
          element={<Characters addToFav={addToFav} favorites={favorites} />}
        />
        <Route
          path="/comics"
          element={<ComicsSearch favorites={favorites} addToFav={addToFav} />}
        />
        <Route
          path="/characters"
          element={<CharactersSearch addToFav={addToFav} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
