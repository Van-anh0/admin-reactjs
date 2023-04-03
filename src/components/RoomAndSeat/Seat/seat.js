import React from "react";
import "./seat.scss";

function Seat({ seat }) {
  return (
    <div className="seat_item">
      <div className="seat_item__row_col">{seat.row + seat.col}</div>
      <div className="seat_item__action"></div>
    </div>
  );
}
export default Seat;
