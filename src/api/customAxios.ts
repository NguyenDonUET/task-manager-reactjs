import axios, { AxiosError, AxiosResponse } from 'axios';
import { BACKEND_URL, SIGN_IN_PATH } from '../utils/constants';
import { handleLogout, refreshToken } from './auth';

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.defaults.timeout = 60 * 10 * 1000;
axiosInstance.defaults.withCredentials = true;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = `Bearer ` + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
let refreshTokenPromise: Promise<void> | null = null;

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      handleLogout().then(() => {
        location.href = '/login';
      });
    }

    const originalRequest = error.config;
    // 410 - lỗi cần refresh token
    if (error.response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken()
          .then((res) => {
            const { accessToken } = res.data;
            localStorage.setItem('accessToken', accessToken);
            axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          })
          .catch((_error) => {
            handleLogout().then(() => {
              location.href = SIGN_IN_PATH;
            });
            return Promise.reject(_error);
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      return refreshTokenPromise.then(() => {
        // để gọi lại api ban đầu bị lỗi
        return axiosInstance(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);
