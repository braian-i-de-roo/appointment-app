import React, {useContext} from 'react';

const useThemes = () => useContext(ThemeContext);

const ThemeContext = React.createContext({});

export default ThemeContext;
