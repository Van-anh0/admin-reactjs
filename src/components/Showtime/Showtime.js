import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { cinemaApi, movieApi } from "actions";

import "./Showtime.scss";

import MovieItem from "./MovieItem/MovieItem";

function Showtime() {
  const [listCinema, setListCinema] = useState([]);
  const [cinemaId, setCinemaId] = useState("");

  const [listMovie, setListMovie] = useState([]);

  function findCinemaById(id) {
    return listCinema.find((item) => item.id === id);
  }

  function handleChangecinema(e) {
    setCinemaId(e.target.value);
  }

  const fetchListCinema = async () => {
    try {
      const response = await cinemaApi.getListCinema();
      setListCinema(response.data);
      setCinemaId(response.data[0].id);
    } catch (error) {
      console.log("Failed to fetch list cinema: ", error);
    }
  };

  // todo: get list movie by showtime in cinema
  const fetchListMovie = async () => {
    try {
      const response = await movieApi.getListMovie();
      setListMovie(response.data);
    } catch (error) {
      console.log("Failed to fetch list cinema: ", error);
    }
  };

  useEffect(() => {
    fetchListCinema();
    fetchListMovie();
  }, []);

  return (
    <div className="showtime">
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={cinemaId}
        onChange={handleChangecinema}
      >
        <MenuItem disabled value="Chọn rạp">
          <em>Chọn rạp</em>
        </MenuItem>
        {listCinema.length > 0 ? (
          listCinema.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))
        ) : (
          <div></div>
        )}
      </Select>

      <div className="showtime__list_movie">
        {listMovie.length > 0 ? (
          listMovie.map((item) => (
            <MovieItem key={item.id} movie={item} cinemaId={cinemaId} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default Showtime;
