import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
const TitleNormal = styled(Text)`
  font-size: 16px;
  margin-top: 5px;
  font-family: 'OpenSans-SemiBold';
  color: rgb(34, 40, 49);
`;
export default function Title(props) {
  return <TitleNormal {...props}>{props.children}</TitleNormal>;
}
