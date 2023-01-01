import React from "react";
import "./Movies.scss";
import Sliderbar from "../Slidebar/Sliderbar";
import Navbar from "../Navbar/Navbar";
import MoviesTable from "../data/MoviesTable";
import { useEffect, useState } from "react";
import { getListMovies } from "../../actions";
function Movies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    let responseMovies = getListMovies();
    responseMovies.then((result) => {
      setMovies(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <div className="list">
      <Sliderbar />
      <div className="listContainer">
        <Navbar />
        <div className="data">
          <MoviesTable listMovies={movies} />
        </div>
      </div>
    </div>
  );
}

export default Movies;
