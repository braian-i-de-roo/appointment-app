import React, {useState} from 'react';

import {View} from 'react-native';
import {Select, SelectItem, Text} from '@ui-kitten/components';

const SelectInput = props => {
  const [selectedIndex, setSelectedIndex] = useState();
  console.log('index', selectedIndex);
  console.log('value', props.value);
  console.log('default', props.default);
  const displayValue = selectedIndex
    ? props.possibleValues[selectedIndex.row]
    : props.value
    ? props.value
    : props.default
    ? props.default
    : undefined;

  const onSelect = index => {
    setSelectedIndex(index);
    props.setter(props.possibleValues[index.row]);
  };
  return (
    <View>
      <Text config="h6">{props.name}</Text>
      <Select
        placeholder={props.name}
        selectedIndex={selectedIndex}
        value={displayValue}
        onSelect={onSelect}>
        {props.possibleValues.map(x => {
          return <SelectItem key={x} title={x} />;
        })}
      </Select>
    </View>
  );
};

export default SelectInput;
