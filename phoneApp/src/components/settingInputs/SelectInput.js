import React, {useState} from 'react';

import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {Card, Icon, Menu, MenuItem, Modal, Text} from '@ui-kitten/components';
import {useLocalization} from '../../providers/localization/LocalizationContext';

const screenWidth = Dimensions.get('screen').width;

const SelectInput = props => {
  const {trl} = useLocalization();
  const [selectedIndex, setSelectedIndex] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const displayValue = selectedIndex
    ? props.possibleValues[selectedIndex.row]
    : props.value || props.default;

  const onSelect = index => {
    setModalVisible(false);
    setSelectedIndex(index);
    props.setter(props.possibleValues[index.row]);
  };
  const trlPrefix = `settings.${props.name}.`;
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)',
          height: 60,
          marginHorizontal: 5,
          paddingHorizontal: 5,
          borderRadius: 5,
        },
      ]}
      onPress={() => {
        setModalVisible(true);
      }}>
      <View style={styles.horizontalContainer}>
        <View style={styles.textContainer}>
          <Text category="h6">{trl(trlPrefix + 'settingName')}</Text>
          <Text appearance="hint">{trl(trlPrefix + 'description')}</Text>
        </View>
        <View style={styles.selectWrapper}>
          <Text appearance="hint">
            {trl(trlPrefix + `options.${displayValue}`)}
          </Text>
          <Icon name="code" style={styles.icon} fill="#8F9BB3" />
        </View>
      </View>
      <Modal
        visible={modalVisible}
        backdropStyle={styles.modalBackdrop}
        onBackdropPress={() => {
          setModalVisible(false);
        }}>
        <Card disabled={true} style={{width: (80.0 * screenWidth) / 100}}>
          <Menu selectedIndex={selectedIndex} onSelect={onSelect}>
            {props.possibleValues.map(x => {
              console.log(trlPrefix + `options.${x}`);
              return (
                <MenuItem key={x} title={trl(trlPrefix + `options.${x}`)} />
              );
            })}
          </Menu>
        </Card>
      </Modal>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    height: 60,
    marginHorizontal: 10,
  },
  icon: {
    height: 16,
    width: 16,
    transform: [{rotate: '90deg'}],
  },
  horizontalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    width: '60%',
    justifyContent: 'center',
  },
  selectWrapper: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default SelectInput;
