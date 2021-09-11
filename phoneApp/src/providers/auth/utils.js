import {SecureStorageRef} from '../secureStorage/SecureStorageContext';
import {Platform} from 'react-native';

const userKey = 'userToken';

export const getToken = async () => {
  const aux = await SecureStorageRef.current.get(userKey);
  return aux || null;
};

export const removeToken = async () => {
  return await SecureStorageRef.current.remove(userKey);
};

export const setToken = async token => {
  return await SecureStorageRef.current.save(userKey, token);
};

export const getDeepLink = (path = '') => {
  const scheme = 'phoneapp';
  const prefix =
    Platform.OS === 'android' ? `${scheme}://phoneapp/` : `${scheme}://`;
  return prefix + path;
};
