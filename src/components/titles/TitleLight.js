import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
const Title = styled.Text`
  color: #3c3c43;
  font-family: 'Montserrat-Light';
  font-size: 16px;
  align-items: flex-start;
  letter-spacing: -0.2px;
  line-height: 24px;
  font-size: 16px;
`;
export default function TitleLight(props) {
  return <Title {...props}>{props.children}</Title>;
}
