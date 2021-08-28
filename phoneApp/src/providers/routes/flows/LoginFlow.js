import React from 'react';
import LoginView from '../../../views/LoginView';

const LoginFlow = props => {
  console.log('props');
  console.log(props);
  const Stack = props.stack;
  return (
    <Stack.Group>
      <Stack.Screen
        name="Login"
        component={LoginView}
        options={{headerShown: false}}
      />
    </Stack.Group>
  );
};

export default LoginFlow;
