import Cookies from 'js-cookie';

import { IAuthResponse, ITokens } from '@/store/user/user.interface';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/token.constants';

export const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken');
  return accessToken || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};

export const saveTokenStorage = (data: ITokens) => {
  Cookies.set(ACCESS_TOKEN, data.accessToken);
  Cookies.set(REFRESH_TOKEN, data.refreshToken);
};

export const removeFromStorage = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  localStorage.removeItem('user');
};

export const saveToStorage = (data: IAuthResponse) => {
  saveTokenStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};
