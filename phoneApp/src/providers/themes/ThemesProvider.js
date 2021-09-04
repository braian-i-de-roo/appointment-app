import React, {useEffect, useState} from 'react';

import ThemeContext from './ThemesContext';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {default as defaultTheme} from './custom-theme.json';
import {useSettings} from '../settings/SettingsContext';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const ThemesProvider = props => {
  const {addSetting} = useSettings();
  const defaultPreferredTheme = 'light';

  const [preferredTheme, setPreferredTheme] = useState(defaultPreferredTheme);

  useEffect(() => {
    addSetting({
      Theme: {
        name: 'theme',
        type: 'select',
        description: 'Theme of the app',
        default: defaultPreferredTheme,
        possibleValues: ['light', 'dark'],
        setter: setPreferredTheme,
        value: preferredTheme,
      },
    });
  }, [preferredTheme]);

  return (
    <ThemeContext.Provider value={{}}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{...eva[preferredTheme], ...defaultTheme}}>
        {props.children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

export default ThemesProvider;
