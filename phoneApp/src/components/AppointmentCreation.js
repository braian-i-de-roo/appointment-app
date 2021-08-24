import React, {useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {useUserData} from '../providers/userDataProvider/UserDataContext';
import {Button, Datepicker, Input, Layout, Text} from '@ui-kitten/components';
import TimeSelect from './TimeSelect';
import DoctorSelect from './DoctorSelect';

const AppointmentCreation = props => {
  const {requestAppointment} = useUserData();
  const onSuccess = props.onSuccessfulRequest;
  const onFailure = props.onFailedRequest;
  const onCancel = props.onCancelledRequest;
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const request = () => {
    const newDate = new Date(date);
    newDate.setHours(time.time, 0, 0, 0);
    requestAppointment(doctorName, newDate, onSuccess, onFailure);
  };
  return (
    <View>
      <Text category="h5">Doctor</Text>
      <DoctorSelect onSelect={setDoctorName} />
      <Text category="h5">Date</Text>
      <Datepicker
        date={date ? date : new Date()}
        onSelect={setDate}
        min={new Date()}
      />
      <Text category="h5">Time</Text>
      <TimeSelect doctor={doctorName} onSelect={setTime} />
      {/*<DateInput onChange={setTime} />*/}
      <Layout style={styles.horizontalView}>
        <Button style={styles.button} onPress={request}>
          REQUEST
        </Button>
        <Button style={styles.button} onPress={onCancel}>
          CANCEL
        </Button>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: '1%',
    width: '48%',
  },
});

export default AppointmentCreation;
