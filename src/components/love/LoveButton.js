import React from 'react';
import {View, Text} from 'react-native';
import SvgLoveWithBack from '../icons/LoveWithBack';
import SvgLove from '../icons/Love';

export default function LoveButton({active, children, ...rest}) {
  return (
    <View
      style={{
        width: 26,
        height: 26,
        borderRadius: 24,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#EFEFF0',
        borderWidth: 1,
      }}>
      {active ? (
        <SvgLoveWithBack width={14} height={14} fill="#9B8ACA" />
      ) : (
        <SvgLove width={16} height={16} fill="#9B8ACA" />
      )}
      {children}
    </View>
  );
}
