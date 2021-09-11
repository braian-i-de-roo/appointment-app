import React, {useState} from 'react';
import SettingsContext from './SettingsContext';
import {useStorage} from '../storage/StorageContext';

const SettingsProvider = props => {
  const [settings, setSettings] = useState({});
  const {save, get} = useStorage();

  const addSetting = async setting => {
    const inner = setting[Object.keys(setting)[0]];
    const settingName = inner.name;
    const oldValue = await get(settingName);
    if (oldValue) {
      inner.setter(oldValue);
      let newSettings = settings;
      newSettings[settingName] = inner;
      setSettings(newSettings);
    } else {
      save(settingName, JSON.stringify(inner.value));
      let newSettings = settings;
      newSettings[settingName] = inner;
      setSettings(newSettings);
    }
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

  const setSetting = (setting, value) => {
    save(setting, JSON.stringify(value));
    settings[setting].setter(value);
  };

  const value = {
    settings,
    addSetting,
    getSettingValue,
    filterSettings,
    setSetting,
  };

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
