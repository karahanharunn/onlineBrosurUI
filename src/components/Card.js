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
  <TouchableOpacity>
    <View key={item.imageUrl} style={styles.parent}>
      <View style={[styles.subView]}>
        <Image
          style={{
            width: 45,
            height: 45,
            backgroundColor: 'transparent',
          }}
          url={item.imageUrl}
        />
      </View>
    </View>
  </TouchableOpacity>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: cardHeight,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 1,
  },
  brand: {
    width: 36,
    height: 36,
  },
});
