import React from 'react';

import {useUserData} from '../providers/userDataProvider/UserDataContext';
import {Button, Divider, Input, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useRoutes} from '../providers/routes/RoutesContext';
import BaseHeader from '../components/navigation/BaseHeader';

const LoginView = () => {
  const {setUserName} = useUserData();
  const {setActiveFlow} = useRoutes();

  const login = () => {
    setActiveFlow('app');
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
        <Button onPress={() => login()}>LOGIN</Button>
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
