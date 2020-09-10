import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {default as Chevron} from '../components/icons/Chevron';

export default function Info({title, buttonName, category}) {
  return (
    <View style={styles.view}>
      <Text style={[styles.Text, category === 'h2' && styles.h2]}>{title}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>
          {buttonName} <Chevron />
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '90%',
    marginTop: '5%',
    fontFamily: 'Roboto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 60,
    alignItems: 'flex-end',
    marginTop: 18,
  },
  textButton: {
    fontSize: 11,
    fontWeight: '600',
  },
  h2: {fontSize: 20, marginTop: 2},
  Text: {
    fontSize: 21,
    fontWeight: '600',
  },
});
