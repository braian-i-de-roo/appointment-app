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
import ThemesProvider from './providers/themes/ThemesProvider';
import DoctorDataProvider from './providers/doctorData/DoctorDataProvider';
import SettingsProvider from './providers/settings/SettingsProvider';
import SettingsView from './views/SettingsView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SettingsProvider>
      <UserDataProvider>
        <DoctorDataProvider>
          <ThemesProvider>
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
                <Stack.Screen
                  name={'Settings'}
                  component={SettingsView}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemesProvider>
        </DoctorDataProvider>
      </UserDataProvider>
    </SettingsProvider>
  );
};
export default App;
