import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
const Title = styled.Text`
  color: #AAAAAA;
  font-family: 'Montserrat-Light';
  font-size: 16px;
  align-items: flex-start;
  letter-spacing: -.2px;
`;
export default function TitleLight(props) {
  return <Title {...props}>{props.children}</Title>;
}
