import axios from "axios";
import { USER_LOADED } from "constants/types";
import store from "store";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    timeout: 10000,
});

// Interceptor to set the token dynamically before each request
axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token') ? JSON.parse(Cookies.get("token"))?.access : null;

      if (token) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Token ${token}`,
          },
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// Set up a response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => {
      // Return the response if the request is successful
      return response;
    },
    (error) => {
      // Check if the error response is available
      if (error.response) {
        const status = error.response.status;
  
        // Handle 401 Unauthorized errors
        if (status === 401) {
          // You can handle redirection to login page or token refresh logic here
          Cookies.remove("token")
  
          store.dispatch({
            type:USER_LOADED
          })
        }
      }
  
      return Promise.reject(error);
    }
  );

export default axiosInstance;