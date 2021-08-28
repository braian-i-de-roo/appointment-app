import React from 'react';

import {Icon, TopNavigationAction} from '@ui-kitten/components';

const BackButton = props => {
  const BackIcon = <Icon name="arrow-back" {...props} />;
  return <TopNavigationAction icon={BackIcon} onPress={props.onPress} />;
};

export default BackButton;
