import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const AppointmentCard = props => {
  const doctorName = props.doctorName || 'Who knows';
  const appointmentTime = props.time || 'Who knows';
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Doctor</Text>
        <Text>: {doctorName}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Time</Text>
        <Text>: {appointmentTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#8fa4b0',
    borderRadius: 6,
    marginBottom: 4,
    elevation: 5,
    padding: 5,
  },
  title: {
    fontWeight: '700',
  },
  textContainer: {
    flexDirection: 'row',
  },
});

export default AppointmentCard;
