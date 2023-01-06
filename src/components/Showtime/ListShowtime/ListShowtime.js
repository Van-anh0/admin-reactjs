import React, { useState, useEffect } from "react";
import { trimDate, trimTime } from "utils/common";

import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function ShowItem({ listShowtime }) {
  const [listDay, setListDay] = useState([]);
  useEffect(() => {
    if (listShowtime) {
      setListDay(Object.keys(listShowtime));
    }
  });

  return (
    <div className="room_item__showtime">
      {listDay.map((item) => (
        <div key={item}>
          <span>Ngày {trimDate(item)}</span>
          <div className="showtime__item">
            {listShowtime[item].map((item) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} key={item.id}>
                <div key={item.id}>
                  <span>{trimTime(item.showtime)}</span>
                </div>
                <TimePicker
                  label="Time"
                  value="2023-01-09T00:00:55+07:00"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowItem;
