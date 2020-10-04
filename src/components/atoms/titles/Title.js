import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
const TitleNormal = styled(Text)`
  font-size: 19px;
  font-family: 'OpenSans-SemiBold';
  color: #121212;
`;
export default function Title(props) {
  return <TitleNormal {...props}>{props.children}</TitleNormal>;
}
