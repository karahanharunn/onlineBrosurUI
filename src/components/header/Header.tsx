import React from 'react';
import {View} from 'react-native';

export default function Header({children, ...rest}) {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        marginRight: 10,
      }}
      {...rest}>
      {children}
    </View>
  );
}
