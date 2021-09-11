/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import UserDataProvider from './providers/userDataProvider/UserDataProvider';
import ThemesProvider from './providers/themes/ThemesProvider';
import DoctorDataProvider from './providers/doctorData/DoctorDataProvider';
import SettingsProvider from './providers/settings/SettingsProvider';
import RoutesProvider from './providers/routes/RoutesProvider';
import LocalizationProvider from './providers/localization/LocalizationProvider';
import SecureStorageProvider from './providers/secureStorage/SecureStorageProvider';
import StorageProvider from './providers/storage/StorageProvider';
import AuthProvider from './providers/auth/AuthProvider';

const App = () => {
  return (
    <SecureStorageProvider>
      <StorageProvider>
        <SettingsProvider>
          <AuthProvider>
            <UserDataProvider>
              <DoctorDataProvider>
                <ThemesProvider>
                  <LocalizationProvider>
                    <RoutesProvider />
                  </LocalizationProvider>
                </ThemesProvider>
              </DoctorDataProvider>
            </UserDataProvider>
          </AuthProvider>
        </SettingsProvider>
      </StorageProvider>
    </SecureStorageProvider>
  );
};
export default App;
