import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_START, CHANNEL_DETAILS_SUCCESS, SUBCRIPTION_DETAILS_SUCCESS, SUBSCRIPTION_DETAILS_FAIL, SUBSCRIPTION_DETAILS_START, SUBSCRIPTION_DETAILS_SUCCESS } from "../actiontype";


export const channelReducer = (state = {
    data: null,
    loading: true,
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case CHANNEL_DETAILS_START:
            return {
                ...state,
                data: null,
                loading: true,
            }
        case CHANNEL_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: payload
            }
        case CHANNEL_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                data: null
            }
        default:
            return state;
    }

}

export const subcriptionReducer = (state = {
    data: false
}, action) => {
    const { type, payload } = action;

    switch (type) {
        case SUBCRIPTION_DETAILS_SUCCESS:
            return {
                ...state,
                data: payload
            }
        default:
            return state;
    }

}


export const subscribedChannelReducer = (state = {
    channels: null,
    loading: true
}, action) => {
    const { type, payload } = action

    switch (type) {
        case SUBSCRIPTION_DETAILS_START:
            return {
                ...state,
                loading: true,
            }
        case SUBSCRIPTION_DETAILS_SUCCESS:
            return {
                ...state,
                channels: payload,
                loading: false
            }
        case SUBSCRIPTION_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}