import React, {useState} from 'react';
import {Select, SelectItem} from '@ui-kitten/components';
import {useDoctorData} from '../providers/doctorData/DoctorDataContext';

const DoctorSelect = props => {
  const {getAvailableDoctors} = useDoctorData();
  const availableDoctors = getAvailableDoctors();
  const [selectedIndex, setSelectedIndex] = useState();
  const displayValue = selectedIndex
    ? availableDoctors[selectedIndex.row]
    : undefined;

  const onSelect = index => {
    setSelectedIndex(index);
    props.onSelect(availableDoctors[index.row]);
  };

  return (
    <Select
      placeholder="Doctor"
      selectedIndex={selectedIndex}
      value={displayValue}
      onSelect={onSelect}>
      {availableDoctors.map(x => (
        <SelectItem title={x} />
      ))}
    </Select>
  );
};

export default DoctorSelect;
