import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import { GRAY_DARK } from '../../../styles/colors';
const Title = styled.Text`
  color: ${GRAY_DARK};
  font-family: 'OpenSans-Regular';
  font-size: 15px;
  align-items: flex-start;
`;
export default function TitleLight(props) {
  return <Title {...props}>{props.children}</Title>;
}
