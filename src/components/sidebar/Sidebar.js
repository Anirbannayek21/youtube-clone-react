import React from 'react'
import "./_sidebar.scss"

import { FaBars } from "react-icons/fa"

import { MdHome, MdExplore, MdSubscriptions, MdVideoLibrary, MdHistory, MdWatchLater, MdThumbUp, MdSettings, MdFlag, MdExitToApp, MdHelp, MdFeedback } from "react-icons/md"

import "./_sidebar.scss"

import { useDispatch } from 'react-redux'
import { logOut } from '../../redux/action/auth.action'
import { NavLink } from 'react-router-dom'


const Sidebar = ({ sidebar, handleOff, notShow }) => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logOut())
    }
    return (
        <nav className={sidebar ? "sidebar open" : "sidebar"} style={notShow ? {
            transform: "translateX(-100%)"
        } : { transform: " translateX(0) " }}>
            <div className="header">
                <FaBars className="menu" size={26}
                    onClick={() => handleOff()}
                />

                <div className="logo">
                    <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" color="white" alt="logo" />
                    <h5>YouTube</h5>
                    <p>IN</p>
                </div>
            </div>
            <div className="start">
                <NavLink className="li" to="/" exact activeClassName="link" onClick={() => handleOff()}>
                    <MdHome size={25} color="#b1bdb4" />
                    <span>Home</span>
                </NavLink>
                <div to="#" exact activeClassName="link" className="li" onClick={() => handleOff()}>
                    <MdExplore size={25} />
                    <span>Explore</span>
                </div>
                <NavLink className="li" onClick={() => handleOff()} to="/feed/subcription" exact activeClassName="link">
                    <MdSubscriptions size={25} color="#b1bdb4" />
                    <span>Subscriptions</span>
                </NavLink>
                <hr />
                <div className="li" onClick={() => handleOff()}>
                    <MdVideoLibrary size={25} />
                    <span>Library</span>
                </div>
                <div className="li mdNoswn" onClick={() => handleOff()}>
                    <MdHistory size={25} />
                    <span>History</span>
                </div>
                <div className="li mdNoswn" onClick={() => handleOff()}>
                    <MdWatchLater size={25} />
                    <span>WatchLater</span>
                </div>

                <div className="li mdNoswn" onClick={() => handleOff()}>
                    <MdThumbUp size={25} />
                    <span>liked Video</span>
                </div>


                <hr />
                <div className="li mdNoswn">
                    <MdSettings size={25} />
                    <span>Settings</span>
                </div>
                <div className="li mdNoswn">
                    <MdFlag size={25} />
                    <span>Report history</span>
                </div>
                <div className="li mdNoswn">
                    <MdHelp size={25} />
                    <span>Help</span>
                </div>
                <div className="li mdNoswn">
                    <MdFeedback size={25} />
                    <span>Report feedback</span>
                </div>
                <hr />
                <div className="li" onClick={() => logoutHandler()}>
                    <MdExitToApp size={25} />
                    <span>logout</span>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar
