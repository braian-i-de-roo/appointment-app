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

  const filterSettings = filter => {
    const fi = filter.toLowerCase();
    let res = [];
    for (const settingName in settings) {
      const setting = settings[settingName];
      if (
        setting.name.toLowerCase().includes(fi) ||
        setting.description.toLowerCase().includes(fi)
      ) {
        res.push(setting);
      }
    }
    return res;
  };

  const value = {
    settings,
    addSetting,
    getSettingValue,
    filterSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
