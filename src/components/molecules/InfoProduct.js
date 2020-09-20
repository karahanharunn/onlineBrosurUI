import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LOGIN_BACKGROUND} from '../../styles/colors';
import Title from '../atoms/titles/Title';
import TitleLight from '../atoms/titles/TitleLight';
import TitleBold from '../atoms/titles/TitleBold';
import {SCALE_12, SCALE_16} from '../../styles/spacing';
import Image from '../atoms/image/Image';

export default function InfoProduct({item}) {
  return (
    <View key={item.name} style={{...styles.container}}>
      <View style={[styles.subView]}>
        <Image url={item.imageUrl} />
      </View>
      <View style={styles.titles}>
        <TitleBold>{item.name}</TitleBold>
        <TitleLight>Yakın Mağaza</TitleLight>
        <Title>5$</Title>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titles: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: SCALE_16,
  },
  subView: {
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    width: 90,
    height: 90,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingBottom: SCALE_12,
    borderBottomWidth: 0.3,
    borderColor: LOGIN_BACKGROUND,
  },
});
