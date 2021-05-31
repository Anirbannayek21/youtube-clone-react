import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { login } from '../../redux/action/auth.action'
import "./_loginScreen.scss"


const LoginScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const accessToken = useSelector(state => state.auth.accessToken)

    useEffect(() => {
        if (accessToken !== null) {
            history.push("/")
        }
    }, [accessToken, history])

    const handleLogin = () => {
        dispatch(login())
    }

    return (
        <div className="main">
            <div className="main_center">
                <h1>YOUTUBE CLONE</h1>
                <img src="https://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="" />
                <button onClick={() => handleLogin()}>Log with google</button>
                <p>this clone is made using Youtube api</p>
            </div>
        </div>
    )
}

export default LoginScreen
