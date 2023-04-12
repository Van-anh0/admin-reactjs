import React from "react"
import Widget from "./widget/Widget"
import "./Container.scss"
function Container() {
  return (
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
  )
}

export default Container