import React from 'react';

import DoctorDataContext from './DoctorDataContext';

const DoctorDataProvider = props => {
  // TODO get these from server
  const getAvailableDoctors = () => {
    return ['Pepe', 'Jose', 'Juan'];
  };

  const getAvailableTimes = doctor => {
    const aux = {
      Pepe: [
        {
          time: 13,
          pretty: '1 PM',
        },
        {
          time: 14,
          pretty: '2 PM',
        },
      ],
      Jose: [
        {
          time: 13,
          pretty: '1 PM',
        },
        {
          time: 15,
          pretty: '3 PM',
        },
      ],
      Juan: [
        {
          time: 18,
          pretty: '6 PM',
        },
        {
          time: 19,
          pretty: '7 PM',
        },
      ],
    };
    const times = aux[doctor];
    return times || [];
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
