import React from 'react';
import AppointmentsView from '../../../views/AppointmentsView';

const AppFlow = props => {
  console.log('props');
  console.log(props);
  const Stack = props.stack;
  return (
    <Stack.Group>
      <Stack.Screen
        name="Home"
        component={AppointmentsView}
        options={{headerShown: false}}
      />
    </Stack.Group>
  );
};

export default AppFlow;
