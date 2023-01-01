import React from "react";
import "../Slidebar/Sliderbar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useNavigate } from "react-router-dom";
function Sliderbar() {
  let navigate = useNavigate();
  const routeChangeMovies = () => {
    let path = `/movies`;
    navigate(path);
  };

  const routeChangeHome = () => {
    let path = `/`;
    navigate(path);
  };

  const routeChangeUsers = () => {
    let path = `/users`;
    navigate(path);
  };
  return (
    <div className="slider">
      <div className="top">
        <span className="logo">Cinestar</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li onClick={routeChangeHome}>
            <DashboardIcon />
            <span>Dashboard</span>
          </li>
          <li onClick={routeChangeMovies}>
            <LiveTvIcon />
            <span>Movies</span>
          </li>
          <li onClick={routeChangeUsers}>
            <PersonIcon />
            <span>Users</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sliderbar;
