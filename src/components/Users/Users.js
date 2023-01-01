import React from "react";
import "./Users.scss";
import Sliderbar from "../Slidebar/Sliderbar";
import Navbar from "../Navbar/Navbar";
import UsersTable from "../data/UserTable";
import { getListUser } from "../../actions";
import { useEffect, useState } from "react";
function List() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let responseUsers = getListUser();
    responseUsers.then((result) => {
      setUsers(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <div className="list">
      <Sliderbar />
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
