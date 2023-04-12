import React from "react";

import Home from "./pages/Home/Home";
import User from "pages/User/User";
import Movie from "pages/Movie/Movie";
import NewMovies from "./components/movies/NewMovies/NewMovies";
import Showtime from "pages/Showtime/Showtime";
import Cinema from "./pages/Cinema/Cinema";
import Product from "./pages/Product/Product";
import Room from "pages/Room/Room";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sliderbar from "components/Slidebar/Sliderbar";

import "App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sliderbar className="slider" />
        <div className="other">
        <Routes>
          <Route path="/">
            <Route index element={<Home/>}/>
            <Route path="cinema" element={<Cinema/>} />
            <Route path="product" element={<Product/>} />
            <Route path="movie" element={<Movie/>} />
            <Route path="showtime" element={<Showtime/>} />
            <Route path="room" element={<Room/>} />
            <Route path="user">
              <Route index element={<User/>} />
              <Route path=":idUser" element={<NewMovies />} />
            </Route>
          </Route>
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

// use map
let array = [1,2,3]
// filter = 3 
