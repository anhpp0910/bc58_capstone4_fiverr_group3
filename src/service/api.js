import axios from 'axios';
import { store } from '..';
import { setLoadingOn, setLoadingOff } from '../redux/spinnerSlice';

export const https = axios.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn',
    headers: {
        TokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1OCIsIkhldEhhblN0cmluZyI6IjAyLzA2LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNzI4NjQwMDAwMCIsIm5iZiI6MTY5MDM5MDgwMCwiZXhwIjoxNzE3NDM0MDAwfQ.I_5jTmaP4oPXDl-5EqRjQqnodRT3qKLF9_hDUjhDwFQ',
    },
});

// Add a request interceptor
https.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        store.dispatch(setLoadingOn());
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
https.interceptors.response.use(
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
