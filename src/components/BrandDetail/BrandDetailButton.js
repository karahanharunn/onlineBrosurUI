import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function BrandDetailButton({icon, visible, ...rest}) {
  return (
    <TouchableOpacity
      {...rest}
      style={{display: visible === true ? 'none' : 'flex'}}>
      {icon}
    </TouchableOpacity>
  );
}
