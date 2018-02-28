import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import * as AuthStore from '@/store/modules/auth';

/* eslint-disable no-param-reassign */

export const jwtRequestInterceptor = axios.interceptors.request.use(
  (req: AxiosRequestConfig) => {
    const { user } = AuthStore.module.state;
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
