import React, {useState} from 'react';

import {Text, View, StyleSheet, Platform, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = props => {
  const [date, setDate] = useState(undefined);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      if (mode === 'date') {
        setShow(Platform.OS === 'ios');
        setDate(selectedDate);
        setMode('time');
        setShow(true);
      } else {
        setShow(Platform.OS === 'ios');
        const oldDate = date;
        const newTime = new Date(selectedDate);
        oldDate.setHours(
          newTime.getHours(),
          newTime.getMinutes(),
          newTime.getSeconds(),
          newTime.getMilliseconds(),
        );
        setDate(oldDate);
        setShow(false);
        setMode('date');
        props.onChange(oldDate);
      }
    }
  };
  return (
    <View>
      {show ? (
        <View>
          <DateTimePicker
            value={date ? date : new Date()}
            onChange={onChange}
            minimumDate={new Date()}
            mode={mode}
            is24Hour={true}
            display="default"
          />
        </View>
      ) : (
        <View style={styles.rows}>
          {date ? <Text>{String(date)}</Text> : <></>}
          <Button
            title={'select Date'}
            onPress={() => {
              setShow(true);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rows: {
    flexDirection: 'row',
  },
});

export default DateInput;
