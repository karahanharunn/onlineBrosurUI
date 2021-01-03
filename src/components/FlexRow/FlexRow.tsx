import React from 'react';
import { Dimensions, View } from 'react-native';
const width = Dimensions.get('window').width;
const FlexRow = ({ children, ...rest }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        marginTop: 8,
        width,
        paddingTop: 0,
      }}
      {...rest}>
      {children}
    </View>
  );
};

export default FlexRow;
