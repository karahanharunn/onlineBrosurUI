import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Image from './image/Image';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardWith = 75;
const cardHeight = 75;
const Spacing = 6;
const renderItem = ({item}) => (
  <View key={item.imageUrl} style={styles.parent}>
    <View style={[styles.subView]}>
      <Image style={styles.image} url={item.imageUrl} />
    </View>
  </View>
);
export default function Card({data}) {
  return (
    <FlatList
      style={styles.flatList}
      removeClippedSubviews
      data={data}
      getItemLayout={(data, index) => ({
        length: 45,
        offset: 45 * index,
        index,
      })}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      snapToAlignment="start"
      snapToInterval={cardWith + Spacing}
      renderItem={renderItem}
    />
  );
}
const styles = StyleSheet.create({
  image: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    marginLeft: 16,
  },
  parent: {
    marginRight: 15,
  },
  subView: {
    width: cardWith,
    height: cardHeight,
    backgroundColor: 'white',
    borderRadius: cardWith,
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2.22,

    elevation: 4,
  },
  brand: {
    width: 36,
    height: 36,
  },
});
