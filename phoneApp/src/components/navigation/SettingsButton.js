import React from 'react';

import {Icon, TopNavigationAction} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const SettingsButton = props => {
  const navigation = useNavigation();
  const SettingsIcon = <Icon name="settings-2-outline" {...props} />;
  return (
    <TopNavigationAction
      icon={SettingsIcon}
      onPress={() => navigation.navigate('Settings')}
    />
  );
};

export default SettingsButton;
