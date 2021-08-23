import React from 'react';

import ThemeContext from './ThemesContext';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {default as theme} from './custom-theme.json';

const ThemesProvider = props => {
  return (
    <ThemeContext.Provider value={{}}>
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        {props.children}
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

export default ThemesProvider;
