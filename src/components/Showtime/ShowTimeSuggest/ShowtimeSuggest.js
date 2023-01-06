import React, { useState, useEffect } from "react";
import { GAP_TIME } from "utils/constants";
import { trimDate, trimTime } from "utils/common";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  actionUpdateShowtime,
  selectCurrentShowtime,
} from "redux/showtime/showtimeSlice";

function ShowtimeSuggest({ movie, roomId }) {
  const currentShowtime = useSelector(selectCurrentShowtime);
  const [listCurrentDay, setListCurrentDay] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentShowtime[roomId]) {
      setListCurrentDay(Object.keys(currentShowtime[roomId]));
    }
  }, [currentShowtime]);

  function suggestShowtime(releaseDate, endDate, durationMovie, showtimeDate) {
    // input: end time, duration of movie, showtime date
    // out: suggest 2 day next and 5 showtime, every showtime between duration of movie

    // set duration = duration of movie plus gapTime
    let duration = durationMovie + GAP_TIME;

    // check showtime_date is null then set showtime_date = releaseDate
    if (!showtimeDate) showtimeDate = releaseDate;

    // get next 2 day from showtime_date
    let listNextDay = {};
    let nextDay = new Date(showtimeDate);
    for (let i = 0; i < 2; i++) {
      // check next day is small than end time
      if (nextDay > endDate) break;

      nextDay.setDate(nextDay.getDate() + i);
      // get list showtime for each day, every showtime between duration of movie
      let listShowtime = [];
      // set nextTime = nextDay and 11h AM
      let nextTime = new Date(nextDay);
      nextTime.setHours(11);

      for (let i = 0; i < 5; i++) {
        let showtime = new Date(nextDay);
        showtime.setHours(nextTime.getHours() + (i * duration) / 60);
        listShowtime.push(showtime);
      }

      listNextDay[trimDate(nextDay)] = listShowtime;
    }
    return listNextDay;
  }

  function handleAddShowtime(roomId, showtimeDate) {
    let listSuggest = suggestShowtime(
      movie.release_date,
      movie.end_date,
      movie.duration,
      showtimeDate
    );

    let currentShow = {
      ...currentShowtime,
      [roomId]: listSuggest,
    };
    dispatch(actionUpdateShowtime(currentShow));
  }

  return (
    <div>
      {/** add showtime */}
      <div className="room_item__showtime">
        {listCurrentDay.length > 0 ? (
          listCurrentDay.map((day) => (
            <div key={day}>
              <span>Ngày {day}</span>
              <div className="showtime__item">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {currentShowtime[roomId][day].map((show, index) => (
                    <div key={index}>
                      <span>{trimTime(show)}</span>
                    </div>
                  ))}
                  {/* <TimePicker
                        label="Time"
                        value="2023-01-09T00:00:55+07:00"
                        renderInput={(params) => <TextField {...params} />}
                      /> */}
                </LocalizationProvider>
              </div>
            </div>
          ))
        ) : (
          <div>Không có suất chiếu</div>
        )}
      </div>
      <button onClick={() => handleAddShowtime(roomId, null)}>
        Thêm suất chiếu đi ban êi
      </button>
    </div>
  );
}

export default ShowtimeSuggest;
