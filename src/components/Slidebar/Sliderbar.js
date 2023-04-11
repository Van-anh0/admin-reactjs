import React from "react";
import "../Slidebar/Sliderbar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import RoomAndSeat from "@mui/icons-material/MeetingRoomOutlined"
import Product from "@mui/icons-material/LocalGroceryStoreOutlined";
import Showtime from "@mui/icons-material/LocalMoviesOutlined";
import { useNavigate } from "react-router-dom";
import { useFindPath } from "hooks/useFindPath";
function Sliderbar() {
  const path = useFindPath();
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
          <li onClick={() => changeRoute("/")}
          className={
            path === "/" ? "active" : "default"
          }
          >
            <DashboardIcon />
            <span>Bảng điều khiển</span>
          </li>
          <li onClick={() => changeRoute("/cinema")}
          className={
            path === "/cinema" ? "active" : "default"
          }
          >
            <PersonIcon />
            <span>Rạp</span>
          </li>
          <li onClick={() => changeRoute("/room")}
          className={
            path === "/room" ? "active" : "default"
          }
          >
            <RoomAndSeat />
            <span>Phòng chiếu & ghế ngồi</span>
          </li>
          <li onClick={() => changeRoute("/movies")}
          className={
            path === "/movies" ? "active" : "default"
          }
          >
            <LiveTvIcon />
            <span>Phim</span>
          </li>
          <li onClick={() => changeRoute("/showtime")}
          className={
            path === "/showtime" ? "active" : "default"
          }>
            <Showtime />
            <span>Suất chiếu</span>
          </li>
          <li onClick={() => changeRoute("/product")}
          className={
            path === "/product" ? "active" : "default"
          }>
            <Product />
            <span>Sản phẩm</span>
          </li>
          <li onClick={() => changeRoute("/users")}
          className={
            path === "/users" ? "active" : "default"
          }>
            <PersonIcon />
            <span>Người dùng</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sliderbar;
