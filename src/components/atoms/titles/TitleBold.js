import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
const Title = styled(Text)`
  font-size: 30px;
  margin-top: 5px;
  font-family: 'CircularStd-Bold';
  color: #121212;
  line-height: 1.3;
`;
export default function TitleBold(props) {
  return <Title {...props}>{props.children}</Title>;
}
