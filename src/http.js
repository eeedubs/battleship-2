import axios from 'axios';

const host = process.env.HOST || 'localhost';
const apiPort = process.env.API_PORT || 3000;
export const http = axios.create({
  baseURL: `http://${host}:${apiPort}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": 'application/json',
  },
  responseType: 'json',
});

export default axios;