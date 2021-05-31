import axiosInstance from "../../axios"
import { HOME_VIDEO_FAIL, HOME_VIDEO_START, HOME_VIDEO_SUCCESS, VIDEO_DETAILS_SUCCESS, VIDEO_DETAILS_START, VIDEO_DETAILS_FAIL, COMMENT_DETAILS_SUCCESS, COMMENT_DETAILS_START, COMMENT_DETAILS_FAIL, COMMENT_ADD_SUCCESS, COMMENT_ADD_FAIL, RELATED_VIDEO_DETAILS_START, RELATED_VIDEO_DETAILS_FAIL, RELATED_VIDEO_DETAILS_SUCCESS } from "../actiontype"

export const popularVideo = () => {
    return async (dispatch, getState) => {
        try {

            dispatch({
                type: HOME_VIDEO_START
            })
            const { data } = await axiosInstance("/videos", {
                params: {
                    part: "snippet,contentDetails,statistics",
                    chart: "mostPopular",
                    regionCode: "IN",
                    maxResults: 20,
                    pageToken: getState().video.nextPageToken,
                }
            })

            dispatch({
                type: HOME_VIDEO_SUCCESS,
                payload: {
                    videos: data.items,
                    nextPageToken: data.nextPageToken,
                    catagory: "all"
                }
            })

        } catch (error) {
            console.log(error.message);
            dispatch({
                type: HOME_VIDEO_FAIL,
                payload: error.message
            })
        }
    }
}


export const get_videos_by_catagory = (keyword) => {
    return async (dispatch, getState) => {
        try {

            dispatch({
                type: HOME_VIDEO_START
            })
            const { data } = await axiosInstance("/search", {
                params: {
                    part: "snippet",
                    q: keyword,
                    maxResults: 20,
                    pageToken: getState().video.nextPageToken,
                    type: "video"
                }
            })
            // console.log(data);
            dispatch({
                type: HOME_VIDEO_SUCCESS,
                payload: {
                    videos: data.items,
                    nextPageToken: data.nextPageToken,
                    catagory: keyword
                }
            })

        } catch (error) {
            console.log(error.message);
            dispatch({
                type: HOME_VIDEO_FAIL,
                payload: error.message
            })
        }
    }
}

export const getVideo_details = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: VIDEO_DETAILS_START,
            })

            const { data } = await axiosInstance.get(`/videos`, {
                params: {
                    part: "snippet,statistics",
                    id: id
                }
            });

            // console.log(data);


            dispatch({
                type: VIDEO_DETAILS_SUCCESS,
                payload: data.items[0]
            })

        } catch (error) {
            dispatch({
                type: VIDEO_DETAILS_FAIL,
                payload: error.message
            })
        }
    }
}



export const get_related_video = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: RELATED_VIDEO_DETAILS_START
            })
            const { data } = await axiosInstance('/search', {
                params: {
                    part: "snippet",
                    relatedToVideoId: id,
                    maxResults: 15,
                    type: "video"
                },
                headers: {
                    Authorization: `Bearer ${getState().auth.accessToken}`
                }
            })
            // console.log(data);
            dispatch({
                type: RELATED_VIDEO_DETAILS_SUCCESS,
                payload: data.items
            })
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: RELATED_VIDEO_DETAILS_FAIL,
                payload: error.message
            })
        }
    }
}



export const commentsDetails = (id) => {
    return async (dispatch, getState) => {
        try {
            // console.log(getState().auth.accessToken);
            dispatch({
                type: COMMENT_DETAILS_START
            })
            const res = await axiosInstance('/commentThreads', {
                params: {
                    part: "snippet",
                    videoId: id,
                },
                headers: {
                    Authorization: `Bearer ${getState().auth.accessToken}`
                }
            })
            // console.log(res);
            dispatch({
                type: COMMENT_DETAILS_SUCCESS,
                payload: res
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: COMMENT_DETAILS_FAIL,
                payload: error.message
            })
        }
    }
}


export const addComment = (id, text) => {
    return async (dispatch, getState) => {
        try {

            const obj = {
                snippet: {
                    videoId: id,
                    topLevelCommet: {
                        snippet: {
                            textOriginal: text
                        }
                    }
                }
            }
            await axiosInstance.post('/commentThreads', obj, {
                params: {
                    part: "snippet",
                },
                headers: {
                    Authorization: `Bearer ${getState().auth.accessToken}`
                }
            });
            dispatch({
                type: COMMENT_ADD_SUCCESS
            })

            setTimeout(() => dispatch(commentsDetails(id)), 4000)
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: COMMENT_ADD_FAIL
            })
        }
    }
}
