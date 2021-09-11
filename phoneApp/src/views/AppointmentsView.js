import React, {useEffect, useState} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import {useUserData} from '../providers/userDataProvider/UserDataContext';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentCreation from '../components/AppointmentCreation';
import {Button, Layout, Text} from '@ui-kitten/components';
import BaseHeader from '../components/navigation/BaseHeader';

const AppointmentsView = ({route, navigation}) => {
  const {getAppointments} = useUserData();
  const [appointments, setAppointments] = useState([]);
  const [showCreationMenu, setShowCreationMenu] = useState(false);

  const updateAppointments = async () => {
    const f = async () => {
      setAppointments(await getAppointments());
    };
    f();
  };

  useEffect(() => {
    updateAppointments();
  }, []);

  const renderAppointments = () => {
    return appointments.map(x => {
      const newKey = x.time + x.doctorName;
      return (
        <AppointmentCard key={newKey} time={x.time} doctorName={x.doctorName} />
      );
    });
  };

  const onSuccessfulRequest = () => {
    setShowCreationMenu(false);
    updateAppointments();
  };

  const onCancelledRequest = () => {
    setShowCreationMenu(false);
  };

  const onFailedRequest = () => {
    // TODO
    console.log('hmmm');
  };

  return (
    <Layout style={styles.container}>
      <BaseHeader title="Appointments" />
      {showCreationMenu ? (
        <AppointmentCreation
          onSuccessfulRequest={onSuccessfulRequest}
          onCancelledRequest={onCancelledRequest}
          onFailedRequest={onFailedRequest}
        />
      ) : undefined}
      <ScrollView>
        {appointments && appointments.length > 0 ? (
          renderAppointments()
        ) : (
          <View style={styles.aux}>
            <Text category="h1">No Appointments Yet</Text>
          </View>
        )}
      </ScrollView>
      {!showCreationMenu ? (
        <View>
          <Button onPress={() => setShowCreationMenu(true)}>
            NEW APPOINTMENT
          </Button>
        </View>
      ) : undefined}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: '100%',
  },
  aux: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppointmentsView;
