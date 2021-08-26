import React, {useEffect, useState} from 'react';
import {Select, SelectItem} from '@ui-kitten/components';
import {useDoctorData} from '../providers/doctorData/DoctorDataContext';

const TimeSelect = props => {
  const [selectedIndex, setSelectedIndex] = useState();
  const doctor = props.doctor;
  const {getAvailableTimes} = useDoctorData();
  const [availableTimes, setAvailableTimes] = useState([]);
  const displayValue = selectedIndex
    ? availableTimes[selectedIndex.row].prettyName
    : undefined;

  const updateTimes = async doctor => {
    const f = async () => {
      const aux = await getAvailableTimes(doctor);
      setAvailableTimes(aux);
    };
    f();
  };

  useEffect(() => {
    if (doctor) {
      updateTimes(doctor);
    }
  }, [doctor]);

  const onSelect = index => {
    setSelectedIndex(index);
    props.onSelect(availableTimes[index.row]);
  };

  return (
    <Select
      placeholder="Time"
      selectedIndex={selectedIndex}
      value={displayValue}
      onSelect={onSelect}>
      {availableTimes.map(x => (
        <SelectItem title={x.prettyName} />
      ))}
    </Select>
  );
};

export default TimeSelect;
