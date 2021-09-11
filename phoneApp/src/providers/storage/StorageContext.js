import React, {useContext} from 'react';

export const useStorage = () => useContext(StorageContext);

const StorageContext = React.createContext({});

export default StorageContext;
