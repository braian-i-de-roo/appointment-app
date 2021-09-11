import React, {useState} from 'react';

import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {Card, Icon, Menu, MenuItem, Modal, Text} from '@ui-kitten/components';
import {useLocalization} from '../../providers/localization/LocalizationContext';
import {useSettings} from '../../providers/settings/SettingsContext';

const screenWidth = Dimensions.get('screen').width;

const SelectInput = props => {
  const trlPrefix = `settings.${props.name}.`;
  const {trlp} = useLocalization();
  const {setSetting} = useSettings();
  const trl = trlp(trlPrefix);
  const [selectedIndex, setSelectedIndex] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const displayValue = selectedIndex
    ? props.possibleValues[selectedIndex.row]
    : props.value || props.default;

  const onSelect = index => {
    setModalVisible(false);
    setSelectedIndex(index);
    setSetting(props.name, props.possibleValues[index.row]);
  };
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
          <Text category="h6">{trl('settingName')}</Text>
          <Text appearance="hint">{trl('description')}</Text>
        </View>
        <View style={styles.selectWrapper}>
          <Text appearance="hint">{trl(`options.${displayValue}`)}</Text>
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
              return <MenuItem key={x} title={trl(`options.${x}`)} />;
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
