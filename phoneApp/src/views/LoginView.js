import React from 'react';

import {Button, TextInput, View} from 'react-native';
import {useUserData} from '../providers/userDataProvider/UserDataContext';
import {useNavigation} from '@react-navigation/native';

const LoginView = () => {
  const {setUserName} = useUserData();
  const navigation = useNavigation();

  const login = () => {
    navigation.navigate('Appointments');
  };

  return (
    <View>
      <TextInput placeholder={'username'} onChangeText={setUserName} />
      <Button title={'LOGIN'} onPress={() => login()} />
    </View>
  );
};

export default LoginView;
