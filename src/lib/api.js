import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor
// to include authentication paramter
api.interceptors.request.use(function (config) {
  config.params = {
    apikey: process.env.REACT_APP_API_KEY,
    ...config.params,
  };

  return config;
});

export default api;
