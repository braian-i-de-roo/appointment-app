import React, {useContext} from 'react';

export const useLocalization = () => useContext(LocalizationContext);

const LocalizationContext = React.createContext({
  currentLanguage: undefined,
  trl: id => {},
  changeLanguage: newLanguage => {},
});

export default LocalizationContext;
