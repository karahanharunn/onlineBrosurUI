import React from 'react';
import { View, Text } from 'react-native';
import SvgLoveWithBack from '../icons/LoveWithBack';
import SvgLove from '../icons/Love';
interface LoveButtonProps {
  active: boolean | undefined,
  children?: React.ReactNode
}
export default function LoveButton({ active, children, ...rest }: LoveButtonProps) {
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
