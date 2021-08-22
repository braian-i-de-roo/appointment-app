import React, {useState} from 'react';

import {Button, StyleSheet, View} from 'react-native';
import {useUserData} from '../providers/userDataProvider/UserDataContext';
import DateInput from './DateInput';
import TextInput from './TextInput';

const AppointmentCreation = props => {
  const {requestAppointment} = useUserData();
  const onSuccess = props.onSuccessfulRequest;
  const onFailure = props.onFailedRequest;
  const onCancel = props.onCancelledRequest;
  const [doctorName, setDoctorName] = useState('');
  const [time, setTime] = useState('');

  const request = () => {
    requestAppointment(doctorName, time, onSuccess, onFailure);
  };
  return (
    <View>
      <TextInput
        title={'Doctor'}
        placeholder={'Braian'}
        onChange={setDoctorName}
      />
      <DateInput onChange={setTime} />
      <View style={styles.horizontalView}>
        <Button title={'Request'} onPress={request} />
        <Button title={'Cancel'} onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalView: {
    flexDirection: 'row',
  },
});

export default AppointmentCreation;
