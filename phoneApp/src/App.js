/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import UserDataProvider from './providers/userDataProvider/UserDataProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginView from './views/LoginView';
import AppointmentsView from './views/AppointmentsView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserDataProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={'Login'}
            component={LoginView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={'Appointments'}
            component={AppointmentsView}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserDataProvider>
  );
};
export default App;
