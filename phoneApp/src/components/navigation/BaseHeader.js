import React from 'react';

import {TopNavigation} from '@ui-kitten/components';
import BackButton from './BackButton';
import SettingsButton from './SettingsButton';

const BaseHeader = props => {
  const onBack = props.onBack;
  return (
    <TopNavigation
      accessoryLeft={onBack ? <BackButton onPress={onBack} /> : undefined}
      alignment="center"
      title={props.title}
      accessoryRight={props.hideSettings ? undefined : <SettingsButton />}
    />
  );
};

export default BaseHeader;
