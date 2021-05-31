import { CHANNEL_DETAILS_SUCCESS, CHANNEL_DETAILS_FAIL, SUBCRIPTION_DETAILS_SUCCESS, CHANNEL_DETAILS_START, SUBSCRIPTION_DETAILS_START, SUBSCRIPTION_DETAILS_FAIL, SUBSCRIPTION_DETAILS_SUCCESS } from "../actiontype"
import axiosInstance from "../../axios"

export const channelDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: CHANNEL_DETAILS_START
            })
            const res = await axiosInstance.get('/channels', {
                params: {
                    part: "snippet,statistics,contentDetails",
                    id: id
                }
            })
            // console.log(res);
            dispatch({
                type: CHANNEL_DETAILS_SUCCESS,
                payload: res.data.items[0]
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: CHANNEL_DETAILS_FAIL,
                payload: error.message
            })
        }
    }
}

export const subcriptionDetails = (id) => {
    return async (dispatch, getState) => {
        try {
            // console.log(getState().auth.accessToken);
            const res = await axiosInstance('/subscriptions', {
                params: {
                    part: "snippet",
                    forChannelId: id,
                    mine: true
                },
                headers: {
                    Authorization: `Bearer ${getState().auth.accessToken}`
                }
            })
            // console.log(res);
            dispatch({
                type: SUBCRIPTION_DETAILS_SUCCESS,
                payload: res.data.items.length !== 0
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export const subscribtedChannel = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: SUBSCRIPTION_DETAILS_START
            })
            const { data } = await axiosInstance("/subscriptions", {
                params: {
                    part: "snippet,contentDetails",
                    mine: true,
                    maxResult: 15
                },
                headers: {
                    Authorization: `Bearer ${getState().auth.accessToken}`
                }
            })
            // console.log(res);
            dispatch({
                type: SUBSCRIPTION_DETAILS_SUCCESS,
                payload: data.items
            })
        } catch (error) {
            console.log(error.message);
            dispatch({
                type: SUBSCRIPTION_DETAILS_FAIL,
                payload: error.message
            })
        }
    }
}