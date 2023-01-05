import React from "react";
import "../Slidebar/Sliderbar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LiveTvIcon from "@mui/icons-material/LiveTv";
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
            <span>Dashboard</span>
          </li>
          <li onClick={() => changeRoute("/cinema")}>
            <PersonIcon />
            <span>Cinema</span>
          </li>
          <li onClick={() => changeRoute("/movies")}>
            <LiveTvIcon />
            <span>Movies</span>
          </li>
          <li onClick={() => changeRoute("/showtime")}>
            <PersonIcon />
            <span>Showtime</span>
          </li>
          <li onClick={() => changeRoute("/product")}>
            <PersonIcon />
            <span>Product</span>
          </li>
          <li onClick={() => changeRoute("/users")}>
            <PersonIcon />
            <span>Users</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sliderbar;
