import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    params:{
        api_key: process.env.REACT_APP_API_KEY
    }
})

export default axiosInstance;