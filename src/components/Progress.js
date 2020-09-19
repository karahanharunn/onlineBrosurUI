import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Progress() {
  return <View style={styles.progress}></View>;
}

const styles = StyleSheet.create({
  progress: {
    height: 2,
    marginTop: 24,
    backgroundColor: 'orange',
    width: '90%',
    marginLeft:'5%'
  },
});
