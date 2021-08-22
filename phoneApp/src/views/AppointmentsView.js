import React, {useEffect, useState} from 'react';

import {Button, View, StyleSheet} from 'react-native';
import {useUserData} from '../providers/userDataProvider/UserDataContext';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentCreation from '../components/AppointmentCreation';

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
  };

  return (
    <View style={styles.container}>
      {showCreationMenu ? (
        <AppointmentCreation
          onSuccessfulRequest={onSuccessfulRequest}
          onCancelledRequest={onCancelledRequest}
          onFailedRequest={onFailedRequest}
        />
      ) : (
        <Button
          title={'new appointment'}
          onPress={() => setShowCreationMenu(true)}
        />
      )}
      {renderAppointments()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});

export default AppointmentsView;
