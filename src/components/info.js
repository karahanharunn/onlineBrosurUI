import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SvgChevron, {default as Chevron} from '../components/icons/Chevron';
import {SCALE_8} from '../styles/spacing';

export default function Info({title, buttonName, category}) {
  return (
    <View style={styles.view}>
      <Text style={[styles.Text, category === 'h2' && styles.h2]}>{title}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>{buttonName}</Text>
        <Chevron
          width="12"
          height="12"
          stroke="black"
          color="black"
          fill="black"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: SCALE_8,
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 18,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  textButton: {
    borderColor: 'black',
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 10,
  },
  h2: {fontSize: 24, marginTop: 2, fontFamily: 'Montserrat-Medium'},
  Text: {
    fontSize: 28,
    paddingTop: 8,
    fontFamily: 'Montserrat-Bold',
    display: 'flex',
  },
});
