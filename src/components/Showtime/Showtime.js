import React, { useState, useEffect } from "react";
import { userApi, showtimeApi } from "actions";
import "./Showtime.scss";
import moment from "moment";
import { Today } from "@mui/icons-material";

function Showtime() {
  const [listMovie, setListMovie] = useState([]);
  const [showtimeAdd, setShowtimeAdd] = useState({
    showtime: moment(Today).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    cinema_id: "74aaafda-852f-4698-bd3e-aeff8766c512",
    movie_id: "1bd6ba73-a3bd-4a34-8b54-8f81da1894af",
    movie_name: "mặc định",
    room_id: "0e435a1d-5b78-4853-99a1-a703a65e2bb0",
    room_name: "Phòng 01",
  });

  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substring(0, 10);

  useEffect(() => {
    userApi.getListMovies().then((result) => {
      setListMovie(result.data);
    });
  }, []);

  // set default movie
  useEffect(() => {
    setShowtimeAdd({
      ...showtimeAdd,
      movie_id: listMovie[0]?.id,
      movie_name: listMovie[0]?.name,
    });
  }, [listMovie]);

  const handleOnChangeDateTime = (e) => {
    let dateTime = moment(e.target.value).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    setShowtimeAdd({
      ...showtimeAdd,
      showtime: dateTime,
    });
  };

  const handleOnChangeMovie = (e) => {
    setShowtimeAdd({
      ...showtimeAdd,
      movie_id: e.target.value,
      movie_name: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleCreateShowtime = () => {
    console.log(showtimeAdd);
    showtimeApi.createShowtime(showtimeAdd).then((result) => {
      console.log(result);
    });
  };

  return (
    <div className="showtime">
      <h1>Quản lý suất chiếu</h1>
      <div className="showtime__form_container">
        <div className="showtime__form">
          <h2>Thêm suất chiếu</h2>

          <div className="showtime__form__item">
            <label>Ngày chiếu</label>
            <input
              type="date"
              onChange={handleOnChangeDateTime}
              defaultValue={date}
            />
          </div>

          <div className="showtime__form__item">
            <label>Phim</label>
            <select onChange={handleOnChangeMovie}>
              {listMovie.map((movie) => {
                return (
                  <option key={movie.id} value={movie.id}>
                    {movie.name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* <div className="showtime__form__item">
            <label>Thời gian chiếu</label>
            <input type="time" />
          </div> */}
        </div>
      </div>
      <div>
        <button
          className="showtime__add"
          onClick={() => handleCreateShowtime()}
        >
          Thêm suất chiếu
        </button>
      </div>
    </div>
  );
}
export default Showtime;
