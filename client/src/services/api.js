import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('bearer');
        const authorization = token ? `Bearer ${token}` : '';
        config.headers.Authorization = authorization;
        return config;
    },
    (error) => Promise.reject(error)
);


export default axios;
