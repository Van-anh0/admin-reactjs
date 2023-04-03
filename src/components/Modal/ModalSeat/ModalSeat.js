import React, { useState } from "react";
// import "./Modal.scss";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { seatApi } from "actions";

const ModalSeat = ({ handleClickModal, roomId }) => {
  const [seat, setseat] = useState({
    name: "Ghế đơn",
    room_id: roomId,
  });

  const handleCloseModal = () => {
    handleClickModal();
  };

  const handleOnChange = (e) => {
    if (e.target.name === "col") {
      // convert string to number
      setseat({ ...seat, [e.target.name]: parseInt(e.target.value) });
      return;
    }
    setseat({ ...seat, [e.target.name]: e.target.value });
  };

  const handleOnCreateSeat = (e) => {
    console.log(seat);
    e.preventDefault();

    seatApi.createSeat(seat).then((res) => {
      let seatName = res.data.row + res.data.col;
      console.log(`Thêm ghế ngồi ${seatName} thành công`);
      handleClickModal();

      // TODO: update list seat in redux
      seatApi.getListSeat(roomId).then((res) => {
        console.log(res.data);
      });
    });
  };

  return (
    <div className="modal">
      <div className="modal_container">
        <div className="modal_bg">
          <div className="modal_close" onClick={() => handleCloseModal()}>
            X
          </div>
          <h1>Tạo ghế ngồi</h1>
          <form className="modal_content" onSubmit={handleOnCreateSeat}>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={seat.name}
              label="format_seat"
              name="format_seat"
              onChange={handleOnChange}
            >
              <MenuItem value={"Ghế đơn"}>Ghế đơn</MenuItem>
              <MenuItem value={"Ghế đôi"}>Ghế đôi</MenuItem>
              <MenuItem value={"Ghế VIP"}>Ghế VIP</MenuItem>
            </Select>
            <TextField
              id="outlined-basic"
              label="Hàng"
              variant="outlined"
              name="row"
              onChange={handleOnChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Cột"
              variant="outlined"
              name="col"
              type="number"
              onChange={handleOnChange}
              required
            />
            <TextField type="submit" onClick={(e) => handleOnCreateSeat(e)} />
          </form>
        </div>
      </div>
    </div>
  );
};
export default ModalSeat;
