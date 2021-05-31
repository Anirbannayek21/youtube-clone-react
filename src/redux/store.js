import { createStore, applyMiddleware, combineReducers } from "redux";

import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import authReducer from "./reducer/auth.reducer"
import { videoReducer, relatedVideo, commentDetails, videoRelatedVideoReducer } from "./reducer/video.reducer";
import { channelReducer, subcriptionReducer, subscribedChannelReducer } from "./reducer/channel.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    video: videoReducer,
    related: relatedVideo,
    channel: channelReducer,
    subcription: subcriptionReducer,
    comments: commentDetails,
    videoRelatedVideo: videoRelatedVideoReducer,
    subscribedChannels: subscribedChannelReducer
})


const store = createStore(
    rootReducer, {}, composeWithDevTools(applyMiddleware(thunk))
)

export default store
