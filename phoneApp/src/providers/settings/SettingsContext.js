import React, {useContext} from 'react';

export const useSettings = () => useContext(SettingsContext);

const SettingsContext = React.createContext({});

export default SettingsContext;
