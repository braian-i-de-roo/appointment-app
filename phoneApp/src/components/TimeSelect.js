import React, {useState} from 'react';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';

const TimeSelect = props => {
  // FIXME
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const availableTimes = ['2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];

  return (
    <Select selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
      {availableTimes.map(x => (
        <SelectItem title={x} />
      ))}
    </Select>
  );
};

export default TimeSelect;
