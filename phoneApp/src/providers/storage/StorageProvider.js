import React from 'react';

import StorageContext from './StorageContext';
import {save, get} from '../../services/StorageService.ts';

const StorageProvider = props => {
  const value = {
    save,
    get,
  };
  return (
    <StorageContext.Provider value={value}>
      {props.children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
