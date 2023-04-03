import React from "react";
import "../Slidebar/Sliderbar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import RoomAndSeat from "@mui/icons-material/MeetingRoomOutlined"
import Product from "@mui/icons-material/LocalGroceryStoreOutlined";
import Showtime from "@mui/icons-material/LocalMoviesOutlined";
import { useNavigate } from "react-router-dom";
function Sliderbar() {
  let navigate = useNavigate();
  function changeRoute(path) {
    navigate(path);
  }

  return (
    <div className="slider">
      <div className="top">
        <span className="logo">Cinestar</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li onClick={() => changeRoute("/")}>
            <DashboardIcon />
            <span>Bảng điều khiển</span>
          </li>
          <li onClick={() => changeRoute("/cinema")}>
            <PersonIcon />
            <span>Rạp</span>
          </li>
          <li onClick={() => changeRoute("/room")}>
            <RoomAndSeat />
            <span>Phòng chiếu & ghế ngồi</span>
          </li>
          <li onClick={() => changeRoute("/movies")}>
            <LiveTvIcon />
            <span>Phim</span>
          </li>
          <li onClick={() => changeRoute("/showtime")}>
            <Showtime />
            <span>Suất chiếu</span>
          </li>
          <li onClick={() => changeRoute("/product")}>
            <Product />
            <span>Sản phẩm</span>
          </li>
          <li onClick={() => changeRoute("/users")}>
            <PersonIcon />
            <span>Người dùng</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sliderbar;
