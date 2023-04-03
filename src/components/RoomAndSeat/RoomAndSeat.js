import React from "react";
import { useState, useEffect } from "react";
import { roomApi, seatApi } from "actions";
import Room from "./Room/room";
import Seat from "./Seat/seat";
import ModalSeat from "components/Modal/ModalSeat/ModalSeat";

import "./RoomAndSeat.scss";

function RoomAndSeat() {
  const [listRoom, setListRoom] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({
    id: "",
    name: "",
  });
  const [listSeat, setListSeat] = useState([]);
  const [showModalSeat, setShowModalSeat] = useState(false);

  useEffect(() => {
    // fetch list room
    let cinemaId = "74aaafda-852f-4698-bd3e-aeff8766c512";
    roomApi.getListRoom(cinemaId).then((res) => {
      setListRoom(res.data);
      setCurrentRoom({
        ...currentRoom,
        id: res.data[0].id,
        name: res.data[0].name,
      });
    });
  }, []);

  const handleOnChangeRoom = (e) => {
    setCurrentRoom({
      ...currentRoom,
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    });
  };

  useEffect(() => {
    if (currentRoom.id) {
      seatApi.getListSeat(currentRoom.id).then((res) => {
        setListSeat(res.data);
      });
    }
  }, [currentRoom]);

  const handleCreateSeat = () => {
    setShowModalSeat(!showModalSeat);
  };

  const handleClickModal = () => {
    setShowModalSeat(!showModalSeat);
  };

  return (
    <div>
      <h1>Quản lý phòng chiếu & ghế ngồi</h1>
      {showModalSeat ? (
        <ModalSeat
          handleClickModal={handleClickModal}
          roomId={currentRoom.id}
        />
      ) : (
        <></>
      )}
      <div className="room">
        <div className="room__left">
          <div className="room__left__top">
            <h3>Phòng chiếu</h3>
            <div className="list__room">
              {listRoom.map((room) => (
                <Room
                  key={room.id}
                  handleOnChangeRoom={handleOnChangeRoom}
                  room={room}
                />
              ))}
            </div>
            <button>Thêm phòng chiếu</button>
            <div className="seat_container">
              <h3>Danh sách ghế ngồi</h3>
              <div className="list__seat">
                {listSeat.map((seat) => (
                  <Seat seat={seat} key={seat.id} />
                ))}
              </div>
              <button onClick={handleCreateSeat}>Thêm ghế ngồi</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RoomAndSeat;
