import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import RootStore from '@/store';

/* eslint-disable no-param-reassign */

export const jwtRequestInterceptor = axios.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    const { user } = RootStore.state.auth;
    if (user) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
  },
  (err: AxiosError) => Promise.reject(err),
);

// Configure interceptor to map error messages
export const errorMessageInterceptor = axios.interceptors.response.use(
  (response: any) => response,
  (err: AxiosError) => {
    // Try to map the backend's error message to the AxiosError's message property.
    if (err.response && err.response.data && err.response.data.message) {
      err.message = err.response.data.message;
    }

    return Promise.reject(err);
  },
);
