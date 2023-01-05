import React, { useState } from "react";
import Room from "components/Showtime/Room/Room";

function MovieItem({ movie, cinemaId }) {
  const [openRoom, setOpenRoom] = useState(false);
  function handleClickOpenRoom() {
    setOpenRoom(!openRoom);
  }
  return (
    <div className="showtime__list_movie__item">
      <div className="showtime__list_movie__item_content">
        <div className="showtime__list_movie__item__img">
          <img
            src={
              movie?.poster
                ? movie.poster
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc2zP2gxs1ky-2H19JBjAFdjO_q2-9m6jXj46b8-oh&s"
            }
          ></img>
        </div>
        <div className="showtime__list_movie__item__info">
          <span>{movie.name}</span>
        </div>
        <button onClick={() => handleClickOpenRoom()}>Mở ra</button>
      </div>
      {openRoom && (
        <Room movie={movie} setOpenRoom={setOpenRoom} cinemaId={cinemaId} />
      )}
    </div>
  );
}

export default MovieItem;
