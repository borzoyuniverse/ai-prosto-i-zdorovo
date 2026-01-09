import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/webhook/json-rpc/',
});

export { axiosInstance };
