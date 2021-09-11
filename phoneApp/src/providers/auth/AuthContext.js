import React, {useContext} from 'react';

export const useAuth = () => useContext(AuthContext);

const AuthContext = React.createContext({
  login: () => {},
});

export default AuthContext;
