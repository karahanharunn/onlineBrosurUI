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
    width: '100%',
    backgroundColor:'white',
    paddingTop: '5%',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    fontFamily: 'Roboto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 18,
  },
  textButton: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    borderColor: 'black',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 11,
    fontWeight: '600',
  },
  h2: {fontSize: 18, marginTop: 2},
  Text: {
    fontSize: 22,
    fontFamily: 'OpenSans-SemiBold',
  },
});
