import React from 'react';

import {useUserData} from '../providers/userDataProvider/UserDataContext';
import {Button, Divider, Input, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useRoutes} from '../providers/routes/RoutesContext';
import BaseHeader from '../components/navigation/BaseHeader';
import {useLocalization} from '../providers/localization/LocalizationContext';
import {useAuth} from '../providers/auth/AuthContext';
import {useKeycloak} from '@react-keycloak/native';

const LoginView = () => {
  const {login} = useAuth();
  const {keycloak} = useKeycloak();
  const {setUserName} = useUserData();
  const {setActiveFlow} = useRoutes();
  const {trl} = useLocalization();

  const access = () => {
    login()
      .catch(x => {
        console.log('auth error', x);
      })
      .then(() => {
        if (keycloak.token) {
          console.log("there's a token");
          setActiveFlow('app');
        } else {
          console.log('error');
        }
      });
  };

  return (
    <Layout>
      <BaseHeader />
      <Layout style={styles.layout}>
        <Text category="h5">Login</Text>
        <Input
          placeholder="username"
          onChangeText={setUserName}
          status="primary"
        />
        <Divider />
        <Button onPress={() => access()}>{trl('login.login')}</Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    height: '100%',
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
});

export default LoginView;
