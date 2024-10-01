import { accessTokenName } from '@/utils/constants';
import Cookie from 'js-cookie';
import axios from 'axios';
import Cookies from 'js-cookie';

export const config = {
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 300_000,
  headers: {
    Authorization: 'Bearer ' + Cookies.get(accessTokenName),
  },
};

const request = axios.create(config);

request.interceptors.request.use(
  (c) => {
    const con = c;
    con.headers.Authorization = 'Bearer ' + Cookies.get(accessTokenName);
    return con;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Cookie.remove(accessTokenName);
      // window.location.reload();
      // window.location.pathname = '/';
    }
    return Promise.reject(error);
  },
);

export { request };
