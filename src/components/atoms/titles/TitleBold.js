import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
const Title = styled(Text)`
  font-size: 18px;
  margin-top: 5px;
  font-family: 'OpenSans-Bold';
  color: rgb(34, 40, 49);
`;
export default function TitleBold(props) {
  return <Title {...props}>{props.children}</Title>;
}
