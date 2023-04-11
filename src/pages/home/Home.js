import React from "react";
import "./Home.scss";
import Widget from "../../components/widget/Widget";
import Header from "../../components/Header/Header";
function Home() {
  return (
    <div>
      <Header/>
      <div className="homeContainer">
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
