import React, {useContext} from 'react';

export const useRoutes = () => useContext(RoutesContext);

const RoutesContext = React.createContext({});

export default RoutesContext;
