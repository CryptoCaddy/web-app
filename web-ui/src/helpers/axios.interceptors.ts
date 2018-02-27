import axios, { AxiosError } from 'axios';

// import store from 'your/store/path/store';

// export default function setup() {
//   axios.interceptors.request.use(
//     function(config) {
//       const token = store.state.token;
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     function(err) {
//       return Promise.reject(err);
//     },
//   );
// }

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
