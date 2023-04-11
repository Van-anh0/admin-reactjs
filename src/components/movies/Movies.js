import React from "react";
import "./Movies.scss";
import Sliderbar from "../Slidebar/Sliderbar";
import MoviesTable from "../data/MoviesTable";
import { useEffect, useState } from "react";
import { userApi } from "actions";
import ModalMovie from "components/Modal/ModalMovie/ModalMovie";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [showModalMovie, setShowModalMovie] = useState(false);

  useEffect(() => {
    userApi.getListMovies().then((result) => {
      setMovies(result.data);
    });
  }, []);

  function handleClickModal() {
    console.log("click");
    setShowModalMovie(!showModalMovie);
  }
  return (
    <div className="list">
      <div className="listContainer">
        {showModalMovie ? (
          <ModalMovie handleClickModal={handleClickModal} />
        ) : (
          <></>
        )}
        <div>
          <button onClick={() => handleClickModal()}>Tạo phim mới đi</button>
        </div>
        <div className="data">
          <MoviesTable listMovies={movies} />
        </div>
      </div>
    </div>
  );
}

export default Movies;
