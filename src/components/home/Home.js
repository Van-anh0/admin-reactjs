import React from "react";
import "../home/Home.scss";
import Sliderbar from "../Slidebar/Sliderbar";
import Navbar from "../Navbar/Navbar";
import Widget from "../widget/Widget";
function Home() {
  return (
    <div className="home">
      <Sliderbar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Home;
