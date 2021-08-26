import React from 'react';

import DoctorDataContext from './DoctorDataContext';

const DoctorDataProvider = props => {
  const apiUrl = props.apiUrl || 'http://192.168.0.102:8091';
  const getAvailableDoctors = async () => {
    const url = apiUrl + '/doctors/';
    return fetch(url)
      .then(r => r.json())
      .catch(x => {
        console.log('an error occurred');
        console.log(x);
      });
  };

  const getAvailableTimes = doctor => {
    const url = apiUrl + '/doctors/' + doctor + '/times';
    console.log(url);
    return fetch(url)
      .then(r => r.json())
      .catch(x => {
        console.log('an error occurred');
        console.log(x);
      });
  };

  const value = {
    getAvailableDoctors,
    getAvailableTimes,
  };
  return (
    <DoctorDataContext.Provider value={value}>
      {props.children}
    </DoctorDataContext.Provider>
  );
};

export default DoctorDataProvider;
