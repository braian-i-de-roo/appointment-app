import React from 'react';
import {render} from '@testing-library/react-native';
import {Text} from 'react-native';

describe('Text', () => {
  it('renders the correct text message', () => {
    const str = 'Hello world!';
    const {queryByText} = render(<Text>{str}</Text>);
    expect(queryByText(str)).not.toBeNull();
  });
});
