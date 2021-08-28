import React, {useState} from 'react';
import SettingsContext from './SettingsContext';

const SettingsProvider = props => {
  const [settings, setSettings] = useState({});

  const addSetting = setting => {
    setSettings({
      ...settings,
      ...setting,
    });
  };

  const getSettingValue = settingName => {
    const aux = settings[settingName];
    if (aux) {
      return aux.value;
    } else {
      throw 'No such setting ' + settingName;
    }
  };

  const value = {
    settings,
    addSetting,
    getSettingValue,
  };

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
