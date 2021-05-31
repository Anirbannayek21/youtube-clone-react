import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { get_videos_by_catagory, popularVideo } from '../../redux/action/video.action'
import "./_catagory.scss"

const catagories = [
    "all",
    "react js",
    "node js",
    "react native",
    "mongoDB",
    "os",
    "DBMS",
    "DSA",
    "popular english song",
    "popular bengali song",
    "popular hindi song",
    "algorithms",
    "web development",
    "app development",
    "machine learning",
    "sports",
    "songs",
    "jokes",
]
const Catagory = () => {
    const dispatch = useDispatch();

    const [active, setactive] = useState("all")

    const handleClick = (val) => {
        setactive(val);
        if (val === 'all') {
            dispatch(popularVideo());
        }
        else {
            dispatch(get_videos_by_catagory(val));
        }
    };

    return (
        <div className="catagory_main">
            {catagories.map((data, i) => (
                <span
                    onClick={() => handleClick(data)}
                    key={i}
                    className={active === data ? "activeClass" : ""}
                >{data}</span>
            ))}
        </div>
    )
}

export default Catagory
