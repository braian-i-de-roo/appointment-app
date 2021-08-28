import React, {useContext} from 'react';

export const useSettings = () => useContext(SettingsContext);

const SettingsContext = React.createContext({
  settings: {},
  addSetting: setting => {},
  getSettingValue: settingName => {},
  filterSettings: filter => {},
});

export default SettingsContext;
