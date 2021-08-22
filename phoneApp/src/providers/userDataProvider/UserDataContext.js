import React, {useContext} from 'react';

export const useUserData = () => useContext(UserDataContext);

const UserDataContext = React.createContext({
  userName: '',
  setUserName: name => {},
  getAppointments: async userName => {},
  requestAppointment: async () => {},
});

export default UserDataContext;
