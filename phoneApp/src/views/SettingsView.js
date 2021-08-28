import React from 'react';

import {Layout} from '@ui-kitten/components';
import {useSettings} from '../providers/settings/SettingsContext';
import {StyleSheet} from 'react-native';
import SelectInput from '../components/settingInputs/SelectInput';

const SettingsView = () => {
  const {settings} = useSettings();

  const drawSettings = () => {
    for (const settingName in settings) {
      const setting = settings[settingName];
      switch (setting.type) {
        case 'select':
          return <SelectInput {...setting} />;
        case 'string':
          break;
        case 'toggle':
          break;
        case 'slider':
          break;
        case 'int':
          break;
        case 'multiSelect':
          break;
      }
    }
  };

  return <Layout style={styles.container}>{drawSettings()}</Layout>;
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default SettingsView;
