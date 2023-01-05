import React from "react";
import "./Users.scss";
import Sliderbar from "../Slidebar/Sliderbar";
import Navbar from "../Navbar/Navbar";
import UsersTable from "../data/UserTable";
import { userApi } from "actions";
import { useEffect, useState } from "react";

function List() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userApi.getListUser().then((result) => {
      setUsers(result.data);
    });
  }, []);

  return (
    <div className="list">
      <div className="listContainer">
        <Navbar />
        <div className="data">
          <UsersTable listUsers={users} />
        </div>
      </div>
    </div>
  );
}

export default List;
