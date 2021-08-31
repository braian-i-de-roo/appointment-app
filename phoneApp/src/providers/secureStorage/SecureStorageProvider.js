import React, {useMemo} from 'react';
import SecureStorageContext, {SecureStorageRef} from './SecureStorageContext';
import Keychain from 'react-native-keychain';

const SecureStorageProvider = props => {
  const secureStorageActions = useMemo(
    () => ({
      save: async (key, value) => {
        const k = 'com.braian.appointmentApp.' + key;
        await Keychain.setGenericPassword(k, value, {service: k});
      },
      get: async key => {
        return await Keychain.getGenericPassword({
          service: 'com.braian.appointmentApp.' + key,
        });
      },
      remove: async key => {
        await Keychain.resetGenericPassword({
          service: 'com.braian.appointmentApp.' + key,
        });
      },
    }),
    [],
  );

  React.useImperativeHandle(SecureStorageRef, () => secureStorageActions);

  return (
    <SecureStorageContext.Provider value={{...secureStorageActions}}>
      {props.children}
    </SecureStorageContext.Provider>
  );
};

export default SecureStorageProvider;
