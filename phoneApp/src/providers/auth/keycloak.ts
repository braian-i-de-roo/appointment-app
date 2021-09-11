import {RNKeycloak} from '@react-keycloak/native';

const keycloak = new RNKeycloak({
  url: 'http://192.168.0.102:8080/auth',
  realm: 'appointment-app',
  clientId: 'web',
});

export default keycloak;
