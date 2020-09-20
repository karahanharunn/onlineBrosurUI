import React from 'react';
import {View, FlatList, Text, StyleSheet, Image, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ImageComponent({data}) {
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View style={styles.parentView}>
          <FastImage
            style={styles.tinyLogo}
            source={{
              uri: item.imageUrl,
            }}
            resizeMode={"cover"}
          />
          
          <View style={styles.flex}>
            <Text style={styles.start}>{item.name}</Text>
            <Text style={styles.end}>{item.minute + ' min'}</Text>
          </View>
          <Text style={styles.subTitle}>{item.count}</Text>
        </View>
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
    marginTop: 5,
    justifyContent: 'space-between',
  },
  subTitle: {
    color: 'gray',
    fontSize: 12,
  },
  end: {fontSize: 11, color: 'gray'},

  tinyLogo: {
    width: windowWidth/1.5,
    height: windowWidth,
  },
  flatList: {
    marginLeft: '6%',

  },
});
