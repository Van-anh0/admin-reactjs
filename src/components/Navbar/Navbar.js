import React from "react";
import "../Navbar/Navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
//https://mui.com/material-ui/material-icons/?query=search&theme=Outlined

function Navbar() {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Tìm kiếm..."></input>
          <SearchOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
