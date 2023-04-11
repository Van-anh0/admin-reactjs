import React from "react"
import "./Header.scss"
import {FcSearch} from "react-icons/fc"
import {GiFlyingFlag} from "react-icons/gi"
import {IoMdNotificationsOutline} from "react-icons/io"
import {FiSettings} from "react-icons/fi"
function Header() {
  return (
    <div className="header-test">
        <div className="header">
            <div className="left">
                <div className="search">
                    <FcSearch />
                    <input type="text" placeholder="Tìm kiếm..."></input>
                </div>
            </div>
            <div className="right">
                <div className="language">
                    <GiFlyingFlag/>
                    English
                </div>

                <IoMdNotificationsOutline/>
                
                <div className="user">
                <img src="https://freenice.net/wp-content/uploads/2021/08/hinh-anh-avatar-dep.jpg" alt="" />
                Henry
                </div>

                <FiSettings/>
           
            </div>
        </div>
    </div>
  )
}

export default Header