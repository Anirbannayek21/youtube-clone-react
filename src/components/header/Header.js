import React, { useState } from 'react'
import { FaBars } from "react-icons/fa"
import { AiOutlineSearch } from "react-icons/ai"
import { MdNotifications, MdApps } from "react-icons/md"

import "./_header.scss"
import { useDispatch, useSelector } from 'react-redux'
import { get_videos_by_catagory } from '../../redux/action/video.action'
import { useHistory } from 'react-router'

const Header = ({ handleToggleSidebar, present }) => {
    const [search, setsearch] = useState("")
    const dispatch = useDispatch()
    const history = useHistory();

    const handleSearch = () => {
        history.push(`/search/${search}`)
        setsearch("")
    }

    const user = useSelector(state => state.auth.user)
    return (
        <div className="header ">
            <div className="d-flex justify-content-around m-0">
                <FaBars className="header_menu" size={26}
                    onClick={() => handleToggleSidebar()}
                />

                <div className="header_logo">
                    <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" color="white" alt="logo" />
                    <h5>YouTube</h5>
                    <p>IN</p>
                </div>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch()
            }}>
                <input type="text" placeholder="search" value={search} onChange={(e) => setsearch(e.target.value)} />
                <button type="submit">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="header_icons">
                <MdNotifications size={28} />
                <MdApps size={28} />
                <img src={!user ? "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" : user.photoUrl} alt="avater" />
            </div>

        </div>
    )
}

export default Header
