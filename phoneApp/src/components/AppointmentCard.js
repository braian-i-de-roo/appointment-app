import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Card, Divider, Text} from '@ui-kitten/components';

const AppointmentCard = props => {
  const doctorName = props.doctorName || 'Who knows';
  const appointmentTime = props.time || 'Who knows';
  return (
    <Card style={styles.card}>
      <View style={styles.textContainer}>
        <Text category="h5">Doctor:</Text>
        <Text category="h5"> {doctorName}</Text>
      </View>
      <Divider />
      <View style={styles.textContainer}>
        <Text category="h6">Time</Text>
        <Text category="h6">: {appointmentTime}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
  },
  title: {
    fontWeight: '700',
  },
  textContainer: {
    flexDirection: 'row',
  },
});

export default AppointmentCard;
