import React, {useEffect, useState} from 'react';

import {Icon, Input, Layout} from '@ui-kitten/components';
import {useSettings} from '../providers/settings/SettingsContext';
import {StyleSheet} from 'react-native';
import SelectInput from '../components/settingInputs/SelectInput';
import BaseHeader from '../components/navigation/BaseHeader';
import {useNavigation} from '@react-navigation/native';

const SettingsView = () => {
  const {settings, filterSettings} = useSettings();
  const navigation = useNavigation();
  const [settingsList, setSettingsList] = useState(settings);

  useEffect(() => {
    setSettingsList(settings);
  }, [settings]);

  const drawSettings = () => {
    return Object.keys(settingsList).map(settingName => {
      const setting = settingsList[settingName];
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
    });
  };

  const updateSettingsList = text => {
    if (text.length > 3) {
      const newSettings = filterSettings(text);
      setSettingsList(newSettings);
    } else {
      setSettingsList(settings);
    }
  };

  return (
    <Layout style={styles.container}>
      <BaseHeader
        onBack={() => navigation.goBack()}
        title="Settings"
        hideSettings
      />
      <Input
        placeholder="Search"
        accessoryRight={<Icon name="search-outline" />}
        onChangeText={updateSettingsList}
      />
      {drawSettings()}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default SettingsView;
