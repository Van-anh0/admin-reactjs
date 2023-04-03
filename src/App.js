import React from "react";

import Home from "./components/home/Home";
import List from "./components/Users/Users";
import Movies from "./components/movies/Movies";
import NewMovies from "./components/movies/NewMovies/NewMovies";
import Showtime from "./components/Showtime/Showtime";
import Cinema from "./components/Cinema/Cinema";
import Product from "./components/Product/Product";
import RoomAndSeat from "./components/RoomAndSeat/RoomAndSeat";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sliderbar from "components/Slidebar/Sliderbar";

import "App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sliderbar className="slider" />
        <Routes>
          <Route path="/">
            <Route path="cinema" element={<Cinema />} />
            <Route path="product" element={<Product />} />
            <Route path="movies" element={<Movies />} />
            <Route path="showtime" element={<Showtime />} />
            <Route path="room" element={<RoomAndSeat />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":idUser" element={<NewMovies />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// use map
let array = [1,2,3]
// filter = 3 
