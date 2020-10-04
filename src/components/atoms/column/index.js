import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import { SCALE_12 } from '../../../styles/spacing';
const Wrapper = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 16px 24px;
`;
export default function Column(props) {
  return <Wrapper {...props}>{props.children}</Wrapper>;
}
