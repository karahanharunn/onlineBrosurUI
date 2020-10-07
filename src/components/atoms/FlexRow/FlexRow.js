import React from 'react';
import {View} from 'react-native';

const FlexRow = ({children, ...rest}) => {
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight:20
      }}
      {...rest}>
      {children}
    </View>
  );
};

export default FlexRow;
