import React, { useState, useEffect } from "react";
import { trimDate, trimTime } from "utils/common";

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
              <div key={item.id}>
                <span>{trimTime(item.showtime)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowItem;
