import apiUtil from '../utils/apiUtil';
import { RESERVATION_API_SERVER } from '../constants/constants';

const baseURL = `${RESERVATION_API_SERVER}/web`;

const handleResponse = (response) => response.text().then((text) => {
  const data = text && JSON.parse(text);
  if (!response.ok) {
    if (response.status === 401) {
      logout();
      window.location.reload(true);
    }
    return Promise.reject(data);
  }
  return data;
});

export const logout = () => { localStorage.removeItem('user'); };

export const login = (account, password) => post(
  '/login', { account, password },
).then((user) => {
  if (user.token) { localStorage.setItem('user', JSON.stringify(user)); }
  return user;
});

export const get = (endpoint) => {
  const apiURL = `${baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  return apiUtil(apiURL, 'GET', true).then(handleResponse);
};

export const post = (endpoint, body) => {
  const apiURL = `${baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  return apiUtil(apiURL, 'POST', true, body).then(handleResponse);
};

export const patch = (endpoint, body) => {
  const apiURL = `${baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  return apiUtil(apiURL, 'PATCH', true, body).then(handleResponse);
};

export const put = (endpoint, body) => {
  const apiURL = `${baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  return apiUtil(apiURL, 'PUT', true, body).then(handleResponse);
};

export const apiDelete = (endpoint) => {
  const apiURL = `${baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  return apiUtil(apiURL, 'DELETE', true).then(handleResponse);
};
