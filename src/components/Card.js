import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SvgDelete from './icons/Delete';

export default function Card({data}) {
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      horizontal={true}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View style={styles.parentView}>
          <View style={styles.subView}>{item.icon}</View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subTitle}>{item.count}</Text>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  parentView: {
    marginTop: 18,
    marginRight: 18,
  },
  title: {
    fontSize: 17,
    marginTop: 5,
    fontWeight: '700',
    color: '#222831',
  },
  subTitle: {
    color: 'gray',
    fontSize: 12,
  },
  subView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(28,110,164,0.51)',
    borderStyle: 'dashed',
    borderWidth: 2.1,
    borderRadius: 10,
    position: 'relative',
    width: 100,
    height: 80,
  },
  flatList: {
    marginLeft: '6%',
    flexGrow: 0,
  },
});
