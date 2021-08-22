import React, {useState} from 'react';

import UserDataContext from './UserDataContext';

const UserDataProvider = props => {
  const defaultUserName = 'undefined';
  const apiUrl = props.apiUrl || 'http://192.168.0.102:8091';
  const [userName, setUserName] = useState(defaultUserName);

  const value = {
    userName,
    setUserName,
    getAppointments: async () => {
      const url = apiUrl + '/appointments/' + userName;
      return fetch(url)
        .then(r => r.json())
        .catch(x => {
          console.log('an error occurred');
          console.log(x);
        });
    },
    requestAppointment: async (doctorName, time, onSuccess, onFailure) => {
      const url = apiUrl + '/appointments/' + userName;
      const data = {
        doctorName,
        desiredTime: time,
      };
      console.log(data);
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then(x => {
          if (x.ok) {
            onSuccess();
          } else {
            onFailure();
          }
        })
        .catch(x => {
          console.log('error requesting appointment');
          console.log(x);
          onFailure();
        });
    },
  };
  return (
    <UserDataContext.Provider value={value}>
      {props.children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
