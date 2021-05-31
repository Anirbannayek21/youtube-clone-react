import auth from "../../firebase"
import firebase from "firebase/app"
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../actiontype"

export const login = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LOGIN_REQUEST,
            })
            const provider = new firebase.auth.GoogleAuthProvider()
            provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")

            const res = await auth.signInWithPopup(provider)


            const accessToken = res.credential.accessToken;

            const profile = {
                name: res.additionalUserInfo.profile.name,
                photoUrl: res.additionalUserInfo.profile.picture
            }

            sessionStorage.setItem("yt-clone-access-token", accessToken)
            sessionStorage.setItem("yt-clone-user", JSON.stringify(profile))

            dispatch({
                type: LOGIN_SUCCESS,
                payload: accessToken
            })

            dispatch({
                type: LOAD_PROFILE,
                payload: profile
            })
        }
        catch (error) {
            console.log(error.message);
            dispatch({
                type: LOGIN_FAIL,
                payload: error.message
            })
        }
    }
}

export const logOut = () => {
    return async (dispatch) => {
        await auth.signOut();
        dispatch({
            type: LOG_OUT
        })

        sessionStorage.removeItem("yt-clone-access-token");
        sessionStorage.removeItem("yt-clone-user")
    }
}