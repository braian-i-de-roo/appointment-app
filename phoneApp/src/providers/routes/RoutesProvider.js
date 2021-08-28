import React, {useState} from 'react';

import RoutesContext from './RoutesContext';
import {NavigationContainer} from '@react-navigation/native';
import LoginFlow from './flows/LoginFlow';
import AppFlow from './flows/AppFlow';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsView from '../../views/SettingsView';

const Stack = createNativeStackNavigator();

const RoutesProvider = props => {
  const flows = {
    login: LoginFlow({stack: Stack}),
    app: AppFlow({stack: Stack}),
  };
  const [CurrentFlow, setCurrentFlow] = useState(flows.login);

  const BaseScreens = (
    <Stack.Group>
      <Stack.Screen
        name="Settings"
        component={SettingsView}
        options={{headerShown: false}}
      />
    </Stack.Group>
  );

  const value = {
    setActiveFlow: name => {
      setCurrentFlow(flows[name]);
    },
  };

  console.log(BaseScreens);

  return (
    <RoutesContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator>
          {CurrentFlow}
          {BaseScreens}
        </Stack.Navigator>
      </NavigationContainer>
    </RoutesContext.Provider>
  );
};

export default RoutesProvider;
