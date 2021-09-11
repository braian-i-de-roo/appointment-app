import React from 'react';
import AuthContext from './AuthContext';
import {ReactNativeKeycloakProvider, useKeycloak} from '@react-keycloak/native';
import keycloak from './keycloak';

const Inner = props => {
  // eslint-disable-next-line no-shadow
  const {keycloak} = useKeycloak();
  const value = {
    login: () => keycloak.login(),
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

const AuthProvider = props => {
  return (
    <ReactNativeKeycloakProvider
      authClient={keycloak}
      onEvent={(event, error) => {
        console.log('onKeycloakEvent', event, error);
      }}
      onTokens={token => {
        console.log('onToken', token);
      }}
      initOptions={{
        redirectUri: 'phoneapp://Homepage',
      }}>
      <Inner>{props.children}</Inner>
    </ReactNativeKeycloakProvider>
  );
};

export default AuthProvider;
