import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from "../actiontype";

const initiaState = {
    accessToken: (sessionStorage.getItem("yt-clone-access-token") ? sessionStorage.getItem("yt-clone-access-token") : null),
    user: (sessionStorage.getItem("yt-clone-user") ? JSON.parse(sessionStorage.getItem("yt-clone-user")) : null),
    loading: false
}

const authReducer = (state = initiaState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: payload,
                loading: false
            }
        case LOGIN_FAIL:
            return {
                ...state,
                accessToken: null,
                loading: false,
                error: payload
            }
        case LOAD_PROFILE:
            return {
                ...state,
                user: payload
            }
        case LOG_OUT:
            return {
                ...state,
                accessToken: null,
                user: null
            }
        default:
            return {
                ...state
            };
    }
}

export default authReducer