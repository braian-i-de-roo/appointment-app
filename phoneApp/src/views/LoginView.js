import React from 'react';

import {useUserData} from '../providers/userDataProvider/UserDataContext';
import {useNavigation} from '@react-navigation/native';
import {Button, Divider, Input, Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

const LoginView = () => {
  const {setUserName} = useUserData();
  const navigation = useNavigation();

  const login = () => {
    navigation.navigate('Appointments');
  };

  return (
    <Layout style={styles.layout}>
      <Input
        placeholder="username"
        onChangeText={setUserName}
        status="primary"
      />
      <Divider />
      <Button onPress={() => login()}>LOGIN</Button>
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
