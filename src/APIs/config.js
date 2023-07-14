import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const adminToken = localStorage.getItem('adminToken');
        if (adminToken)
        {
            config.headers['Authorization'] = `Bearer ${adminToken}`;
        }
        else if (token)
        {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
)


export default axiosInstance;