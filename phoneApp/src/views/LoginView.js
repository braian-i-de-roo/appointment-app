import React from 'react';

import {useUserData} from '../providers/userDataProvider/UserDataContext';
import {useNavigation} from '@react-navigation/native';
import {Button, Divider, Input, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const LoginView = () => {
  const {setUserName} = useUserData();
  const navigation = useNavigation();

  const login = () => {
    navigation.navigate('Appointments');
  };

  return (
    <Layout>
      <Layout style={styles.layout}>
        <Button onPress={() => navigation.navigate('Settings')}>
          SETTINGS
        </Button>
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
