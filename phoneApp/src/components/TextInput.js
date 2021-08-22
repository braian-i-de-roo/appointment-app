import React from 'react';

import {StyleSheet, Text, TextInput as RNTextInput, View} from 'react-native';

const TextInput = props => {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.textBox}>
        <RNTextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          onChangeText={props.onChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 20,
  },
  textBox: {
    borderColor: '#9b9b9b',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'white',
    elevation: 2,
  },
  textInput: {
    fontSize: 20,
    height: 40,
  },
});

export default TextInput;
