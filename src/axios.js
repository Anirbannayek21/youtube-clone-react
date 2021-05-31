import axios from "axios";

console.log(process.env.REACT_APP_YT_API_KEY);
const axiosInstance = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    params: {
        key: process.env.REACT_APP_YT_API_KEY
    }
})

export default axiosInstance