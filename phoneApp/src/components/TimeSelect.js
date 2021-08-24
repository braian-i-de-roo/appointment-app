import React, {useState} from 'react';
import {Select, SelectItem} from '@ui-kitten/components';
import {useDoctorData} from '../providers/doctorData/DoctorDataContext';

const TimeSelect = props => {
  const [selectedIndex, setSelectedIndex] = useState();
  const doctor = props.doctor;
  const {getAvailableTimes} = useDoctorData();
  const availableTimes = getAvailableTimes(doctor);
  const displayValue = selectedIndex
    ? availableTimes[selectedIndex.row].pretty
    : undefined;

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
        <SelectItem title={x.pretty} />
      ))}
    </Select>
  );
};

export default TimeSelect;
