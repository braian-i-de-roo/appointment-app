import React, {useContext} from 'react';

export const useDoctorData = () => useContext(DoctorDataContext);

const DoctorDataContext = React.createContext({
  getAvailableDoctors: () => {},
  getAvailableTimes: doctor => {},
});

export default DoctorDataContext;
