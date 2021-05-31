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
                <li onClick={() => handleOff()}>
                    <MdHome size={25} />
                    <span>Home</span>
                </li>
                <li onClick={() => handleOff()}>
                    <MdExplore size={25} />
                    <span>Explore</span>
                </li>
                <NavLink to="/feed/subcription" className="link">
                    <li onClick={() => handleOff()} >
                        <MdSubscriptions size={25} />
                        <span>Subscriptions</span>
                    </li>
                </NavLink>
                <hr />
                <li onClick={() => handleOff()}>
                    <MdVideoLibrary size={25} />
                    <span>Library</span>
                </li>
                <li className="mdNoswn" onClick={() => handleOff()}>
                    <MdHistory size={25} />
                    <span>History</span>
                </li>
                <li className="mdNoswn" onClick={() => handleOff()}>
                    <MdWatchLater size={25} />
                    <span>WatchLater</span>
                </li>

                <li className="mdNoswn" onClick={() => handleOff()}>
                    <MdThumbUp size={25} />
                    <span>liked Video</span>
                </li>


                <hr />
                <li className="mdNoswn">
                    <MdSettings size={25} />
                    <span>Settings</span>
                </li>
                <li className="mdNoswn">
                    <MdFlag size={25} />
                    <span>Report history</span>
                </li>
                <li className="mdNoswn">
                    <MdHelp size={25} />
                    <span>Help</span>
                </li>
                <li className="mdNoswn">
                    <MdFeedback size={25} />
                    <span>Report feedback</span>
                </li>
                <hr />
                <li onClick={() => logoutHandler()}>
                    <MdExitToApp size={25} />
                    <span>logout</span>
                </li>
            </div>
        </nav>
    )
}

export default Sidebar
