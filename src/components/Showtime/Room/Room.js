import React, { useState, useEffect } from "react";
import { roomApi, showtimeApi } from "actions";
import ShowItem from "components/Showtime/ShowItem/ShowItem";

function Room({ movie, setOpenRoom, cinemaId }) {
  const [showtimeByRoom, setShowtimeByRoom] = useState({});
  const [listRoomMatch, setListRoomMatch] = useState([]);
  const [listRoomMistmatch, setListRoomMistmatch] = useState([]);
  const [openMoreRoom, setOpenMoreRoom] = useState(true);

  const fetchListRoomMatch = async (movieId, cinemaId) => {
    try {
      const response = await roomApi.getListRoom(movieId, cinemaId);
      setListRoomMatch(response.data);
    } catch (error) {
      console.log("Failed to fetch list cinema: ", error);
    }
  };

  const fetchListRoomMismatch = async (movieId, cinemaId) => {
    try {
      const response = await roomApi.getListRoom(movieId, cinemaId);
      // filter list room not match with list room match
      console.log(response.data);
      let listMismatch = response.data.filter(
        (item) => !listRoomMatch.includes(item)
      );
      console.log(listMismatch);
      setListRoomMistmatch(listMismatch);
    } catch (error) {
      console.log("Failed to fetch list cinema: ", error);
    }
  };

  const fetchListShowtimeByRoom = async (listRoomId, movieId) => {
    // check listRoomId and movieId is empty
    if (!listRoomId || !movieId) return;
    try {
      const response = await showtimeApi.getlistShowtimeByRoom(
        listRoomId,
        movieId
      );
      setShowtimeByRoom(response.data);
    } catch (error) {
      console.log("Failed to fetch list cinema: ", error);
    }
  };

  function handleClickMoreRoom() {
    fetchListRoomMismatch("", cinemaId);
    setOpenMoreRoom(!openMoreRoom);
  }

  function getListStringRoomId(listRoom) {
    console.log(listRoom);
    let listStringRoomId = "";
    listRoom.forEach((item) => {
      listStringRoomId += item.id + ",";
    });
    // remove last character
    listStringRoomId = listStringRoomId.slice(0, -1);
    return listStringRoomId;
  }

  useEffect(() => {
    fetchListRoomMatch(movie.id, cinemaId);
    let listString = getListStringRoomId(listRoomMatch);
    fetchListShowtimeByRoom(listString, movie.id);
  }, []);

  return (
    <div className="movie_item__room">
      <div className="movie_item__room__item">
        {listRoomMatch?.length > 0 ? (
          listRoomMatch.map((item) => (
            <div key={item.key}>
              <div>{item.name}</div>
              <ShowItem listShowtime={showtimeByRoom[item.id]} />
            </div>
          ))
        ) : (
          <div></div>
        )}
        {listRoomMistmatch.length > 0 ? (
          listRoomMistmatch.map((item) => (
            <div key={item.key}>
              <div>{item.name}</div>
              <div>
                <button>Thêm suất chiếu</button>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}

        {openMoreRoom ? (
          <button onClick={() => handleClickMoreRoom()}>
            Thêm phòng chiếu
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Room;
