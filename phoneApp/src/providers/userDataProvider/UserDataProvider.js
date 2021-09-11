import React, {useState} from 'react';

import UserDataContext from './UserDataContext';
import {getAppointments, requestAppointment} from '../../services/UserData';

const UserDataProvider = props => {
  const defaultUserName = 'undefined';
  const [userName, setUserName] = useState(defaultUserName);

  const value = {
    userName,
    setUserName,
    getAppointments,
    requestAppointment,
  };
  return (
    <UserDataContext.Provider value={value}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
