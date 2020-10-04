import React from 'react';
import {View, FlatList, Text, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Image from '../atoms/image/Image';
import {SCALE_12} from '../../styles/spacing';
import {TouchableOpacity} from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ImageComponent({data, navigation}) {
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      keyExtractor={(item) => item.brandName}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Brand', {
              data: data,
              selectedId: item.brandName,
              item,
            })
          }>
          <View key={item.brandId} style={styles.parentView}>
            <Image
              style={{width: windowWidth / 2, height: windowWidth / 3}}
              url={item.thumbCoverImageUrl}
              resizeMode={'cover'}
            />
            <View style={styles.flex}>
              <Text style={styles.start}>{item.brandName}</Text>
              <Text style={styles.end}>{item.date ?? 'Bu Hafta'}</Text>
            </View>
            <Text style={styles.subTitle}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
const styles = StyleSheet.create({
  parentView: {
    marginRight: 24,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  subTitle: {
    fontSize: 12,
    color: '#C1C0C3',
  },
  end: {fontSize: 12, color: '#C1C0C3'},
  start: {
    fontSize: 16,
    lineHeight: 20,
    color: '#333333',
    fontFamily: 'Montserrat-Medium',
  },
  tinyLogo: {
    width: windowWidth,
    height: windowWidth,
  },
  flatList: {
    marginLeft: '6%',
    marginTop: SCALE_12,
  },
});
