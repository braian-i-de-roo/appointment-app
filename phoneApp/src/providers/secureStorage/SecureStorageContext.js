import React, {useContext} from 'react';

export const useSecureStorage = () => useContext(SecureStorageContext);
export const SecureStorageRef = React.createRef();

const SecureStorageContext = React.createContext({
  save: (key, value) => {},
  get: key => {},
  remove: key => {},
});

export default SecureStorageContext;
