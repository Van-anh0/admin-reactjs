import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { cinemaApi, movieApi, showtimeApi } from "actions";
import { GAP_TIME, MAX_TIMES_SUGGEST } from "utils/constants";
import { trimDate, trimTime, convertStringToTime } from "utils/common";

import "./Showtime.scss";

import MovieItem from "./MovieItem/MovieItem";
import moment from "moment";

function Showtime() {
  const [listCinema, setListCinema] = useState([]);
  const [cinemaId, setCinemaId] = useState("");

  const [listMovie, setListMovie] = useState([]);
  const [suggestTime, setSuggestTime] = useState({});

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

  const [listRoomId, setListRoomId] = useState();
  const [objectShowtime, setObjectShowtime] = useState();

  // input useState listShowtime
  // output return a list of object with format {room_id-room_name: {date: {movie_id-movie_name: [list time]}}}
  function handleInitDataShowtimeToRenderHtml(data) {
    let newListShowtime = {};
    data.forEach((item) => {
      let roomKey = item.room_id + "|" + item.room_name;
      let dateKey = trimDate(item.showtime);
      let movieKey = item.movie_id + "|" + item.movie_name;

      // create new roomKey if not exist
      if (!newListShowtime[roomKey]) newListShowtime[roomKey] = {};

      // create new dateKey if not exist
      if (!newListShowtime[roomKey][dateKey])
        newListShowtime[roomKey][dateKey] = {};

      // create new movieKey if not exist
      if (!newListShowtime[roomKey][dateKey][movieKey])
        newListShowtime[roomKey][dateKey][movieKey] = [];

      newListShowtime[roomKey][dateKey][movieKey].push(trimTime(item.showtime));
    });
    return newListShowtime;
  }

  function fetchListShowtime(cinemaId) {
    showtimeApi.getList(cinemaId).then((response) => {
      let listShowtime = response.data;
      let objectShowtime = handleInitDataShowtimeToRenderHtml(listShowtime);
      setObjectShowtime(objectShowtime);
    });
  }

  useEffect(() => {
    fetchListShowtime(cinemaId);
  }, [cinemaId]);

  useEffect(() => {
    if (objectShowtime) {
      setListRoomId(Object.keys(objectShowtime));
    }
  }, [objectShowtime]);

  function splitKey(key, index) {
    let array = key.split("|");
    // check index out of range
    if (index >= array.length) return "";
    return array[index];
  }
  function getToday() {
    let today = new Date();
    return trimDate(today);
  }

  function handleClickSuggestTime() {
    let listNextDay = suggestionShowtimeMovie(
      new Date(),
      null,
      11,
      120,
      GAP_TIME
    );
    setSuggestTime(listNextDay);
  }

  function suggestionShowtimeMovie(
    showDate,
    endDate,
    startTime,
    duration,
    gapTime
  ) {
    // suggest 2 day next and time, start from startTime, every showtime between duration+gapTime of movie
    // input: showDate, startTime, duration, gapTime
    // output: listNextDay = {day1: [time1, time2, time3, time4, time5], day2: [time1, time2, time3, time4, time5]}
    let listNextDay = {};
    let nextDay = new Date(showDate);
    let timeBetween = (duration + gapTime) / 60;

    for (let i = 0; i < 2; i++) {
      // check next day is small than end time
      if (endDate && nextDay > endDate) break;

      // get next day
      let listTime = [];
      nextDay.setDate(nextDay.getDate() + 1);

      // set nextTime = nextDay and 11h AM
      let nextTime = new Date(nextDay);
      nextTime.setHours(startTime);

      // get list time, for until 24h
      let count = 0;
      let conditionStop = nextDay.getDate() + 1;
      while (nextTime.getDate() < conditionStop) {
        listTime.push(trimTime(nextTime));
        nextTime.setHours(nextTime.getHours() + timeBetween);
        if (count > MAX_TIMES_SUGGEST) break;
        count++;
      }

      // add list time to list day
      listNextDay[trimDate(nextDay)] = listTime;
    }
    return listNextDay;
  }

  function handleAddMoreDate(date, listShowtime) {
    // input listShowtime
    // out put listShowtime with more date
    let nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    let listTime = [];

    listShowtime.forEach((item) => {
      // convert item string to date from '12:00 AM' to nextDay +'12:00:00.000Z'
      let dateItem = moment(item, "hh:mm A").toDate(nextDay);
      nextDay.setHours(dateItem.getHours());
      listTime.push(nextDay);
    });

    return listTime;
  }

  function handleAddMoreMovie(movie, date, room, cinemaId, listShowtime) {
    let listTime = handleAddMoreDate(date, listShowtime);
    console.log(listTime);
    let data = {
      movie_id: splitKey(movie, 0),
      room_id: splitKey(room, 0),
      cinema_id: cinemaId,
      list_showtime: listTime,
      movie_name: splitKey(movie, 1),
      room_name: splitKey(room, 1),
    };
    showtimeApi.createMultiple(data).then((response) => {
      // alert("Thêm thành công");
      fetchListShowtime(cinemaId);
    });
  }

  function handleAddMoreTime() {
    alert("turn on modal add more time");
  }

  return (
    <div className="showtime">
      <h1>Quản lý suất chiếu</h1>
      <div className="showtime__cinema">
        <h2>Chọn rạp</h2>
        <select
          name="cinema"
          id="cinema"
          onChange={(e) => setCinemaId(e.target.value)}
        >
          <option value="">Chọn rạp</option>
          {listCinema &&
            listCinema.map((item) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="showtime__room_container">
        {listRoomId &&
          listRoomId.map((roomKey) => {
            return (
              <div className="showtime__room" key={roomKey}>
                <h2>Phòng: {splitKey(roomKey, 1)}</h2>
                {
                  // check roomKey exist in objectShowtime
                  objectShowtime[roomKey] &&
                    Object.keys(objectShowtime[roomKey]).map((date) => {
                      return (
                        <div className="showtime__room__date" key={date}>
                          <h3>Ngày: {date}</h3>
                          {Object.keys(objectShowtime[roomKey][date]).map(
                            (movieKey) => {
                              return (
                                <div
                                  className="showtime__room__date__movie"
                                  key={movieKey}
                                >
                                  <h4>Phim: {splitKey(movieKey, 1)}</h4>
                                  <div className="showtime__room__date__movie__time">
                                    {objectShowtime[roomKey][date][
                                      movieKey
                                    ].map((time, index) => {
                                      return (
                                        <h5
                                          className="showtime__room__date__movie__time__item"
                                          key={index}
                                        >
                                          {time}
                                        </h5>
                                      );
                                    })}
                                    <button onClick={() => handleAddMoreTime()}>
                                      Thêm suất
                                    </button>
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleAddMoreMovie(
                                        movieKey,
                                        date,
                                        roomKey,
                                        cinemaId,
                                        objectShowtime[roomKey][date][movieKey]
                                      )
                                    }
                                  >
                                    Thêm ngày
                                  </button>
                                </div>
                              );
                            }
                          )}
                        </div>
                      );
                    })
                }
              </div>
            );
          })}
      </div>
      <div className="showtime__form_container">
        <div className="showtime__form">
          <h2>Thêm suất chiếu</h2>
          <div className="showtime__form__item">
            <label>Phòng chiếu</label>
            <select>
              <option value="1">Phòng 1</option>
              <option value="2">Phòng 2</option>
              <option value="3">Phòng 3</option>
            </select>
          </div>
          <div className="showtime__form__item">
            <label>Ngày chiếu</label>
            <input type="date" />
          </div>
          <div className="showtime__form__item">
            <label>Phim</label>
            <select>
              <option value="1">Phim 1</option>
              <option value="2">Phim 2</option>
              <option value="3">Phim 3</option>
            </select>
          </div>
          <div className="showtime__form__item">
            <label>Thời gian chiếu</label>
            <input type="time" />
          </div>
          <div className="showtime__form__item">
            <label>Giá vé</label>
            <input type="number" />
          </div>
        </div>
        <div className="showtime__suggest">
          <h2>Gợi ý suất chiếu</h2>
          <div className="showtime__suggest__item">
            <label>Thời gian giữa 2 suất</label>
            <input type="number" />
          </div>
          {suggestTime &&
            Object.keys(suggestTime).map((day) => {
              return (
                <div className="showtime__suggest__item" key={day}>
                  <label>Ngày: {day}</label>
                  <div className="showtime__suggest__item__time">
                    {suggestTime[day].map((time, index) => {
                      return (
                        <h5
                          className="showtime__suggest__item__time__item"
                          key={index}
                        >
                          {time}
                        </h5>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <button
          className="showtime__add"
          onClick={() => handleClickSuggestTime()}
        >
          Thêm suất chiếu
        </button>
      </div>
    </div>
  );
}
export default Showtime;
