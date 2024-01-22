import axios from 'axios';
// import { store } from '..';
// import { setLoadingOn, setLoadingOff } from '../redux/spinnerSlice';

export const https = axios.create({
    baseURL: 'https://fiverrnew.cybersoft.edu.vn',
    headers: {
        TokenCybersoft:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1OCIsIkhldEhhblN0cmluZyI6IjAyLzA2LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNzI4NjQwMDAwMCIsIm5iZiI6MTY5MDM5MDgwMCwiZXhwIjoxNzE3NDM0MDAwfQ.I_5jTmaP4oPXDl-5EqRjQqnodRT3qKLF9_hDUjhDwFQ',
    },
});
