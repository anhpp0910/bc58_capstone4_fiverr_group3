import axios from 'axios';
import { store } from '..';
import { setLoadingOn, setLoadingOff } from '../redux/spinnerSlice';

const httpsRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        tokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1OCIsIkhldEhhblN0cmluZyI6IjAyLzA2LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNzI4NjQwMDAwMCIsIm5iZiI6MTY5MDM5MDgwMCwiZXhwIjoxNzE3NDM0MDAwfQ.I_5jTmaP4oPXDl-5EqRjQqnodRT3qKLF9_hDUjhDwFQ',
    },
});

export const get = async (path, options = {}) => {
    const response = await httpsRequest.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await httpsRequest.post(path, options);
    return response.data;
};

export const put = async (path, options = {}) => {
    const response = await httpsRequest.put(path, options);
    return response.data;
};

export const _delete = async (path, options = {}) => {
    const response = await httpsRequest.delete(path, options);
    return response.data;
};

// Add a request interceptor
httpsRequest.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = JSON.parse(localStorage.getItem('USER_TOKEN'));
        if (token) {
            config.headers.token = token;
        }
        store.dispatch(setLoadingOn());
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
httpsRequest.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        store.dispatch(setLoadingOff());
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        store.dispatch(setLoadingOff());
        return Promise.reject(error);
    },
);

export default httpsRequest;
