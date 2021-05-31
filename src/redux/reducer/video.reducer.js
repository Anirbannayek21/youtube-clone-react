import { COMMENT_DETAILS_FAIL, COMMENT_DETAILS_START, COMMENT_DETAILS_SUCCESS, HOME_VIDEO_FAIL, HOME_VIDEO_START, HOME_VIDEO_SUCCESS, RELATED_VIDEO_DETAILS_FAIL, RELATED_VIDEO_DETAILS_START, RELATED_VIDEO_DETAILS_SUCCESS, VIDEO_DETAILS_FAIL, VIDEO_DETAILS_START, VIDEO_DETAILS_SUCCESS } from "../actiontype";

const initialState = {
    videos: [],
    nextPageToken: null,
    loading: true,
    activeCatagory: "all"
}

export const videoReducer = (videoState = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case HOME_VIDEO_START:
            return {
                ...videoState,
                loading: true
            }
        case HOME_VIDEO_SUCCESS:
            return {
                ...videoState,
                videos: (videoState.activeCatagory === payload.catagory ? [...videoState.videos, ...payload.videos] : payload.videos)
                ,
                nextPageToken: payload.nextPageToken,
                loading: false,
                activeCatagory: payload.catagory
            }
        case HOME_VIDEO_FAIL:
            return {
                ...videoState,
                error: payload,
                loading: false
            }
        default:
            return {
                ...videoState
            }
    }
}



export const relatedVideo = (state = {
    data: null,
    loading: true
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case VIDEO_DETAILS_START:
            return {
                ...state,
                loading: true,
                data: null
            }
        case VIDEO_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            }
        case VIDEO_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export const videoRelatedVideoReducer = (state = {
    videos: null,
    loading: true
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case RELATED_VIDEO_DETAILS_START:
            return {
                ...state,
                loading: true,
            }
        case RELATED_VIDEO_DETAILS_SUCCESS:
            return {
                ...state,
                videos: payload,
                loading: false,
            }
        case RELATED_VIDEO_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}


export const commentDetails = (state = {
    data: null,
    loading: true
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case COMMENT_DETAILS_START:
            return {
                ...state,
                data: null,
                loading: true,
            }
        case COMMENT_DETAILS_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false
            }
        case COMMENT_DETAILS_FAIL:
            return {
                ...state,
                data: null,
                loading: false
            }
        default:
            return state;
    }

}