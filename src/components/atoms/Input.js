import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function Input(props) {
  return (
    <TextInput
      style={styles.input}
      {...props}
      placeholderTextColor="#95979A"></TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 44,
    padding: 10,
    borderWidth: 0.2,
    color: '#6E7E9F',
    borderColor: '#6E7E9F',
    marginBottom: 10,
    borderRadius: 6,
  },
});
