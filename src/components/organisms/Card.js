import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import SvgDelete from '../icons/Delete';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SharedElement} from 'react-navigation-shared-element';
import {GRAY_DARK} from '../../styles/colors';
import {config} from '../../services/Config';
import TitleLight from '../atoms/titles/TitleLight';
import Title from '../atoms/titles/Title';
import Image from '../atoms/image/Image';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardWith = 60;
const cardHeight = 40;
const Spacing = 6;

export default function Card({
  data,
  detailUrl = 'Category',
  navigation,
  selectedId,
  isMaster,
}) {
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.name}
      snapToAlignment="start"
      snapToInterval={cardWith + Spacing}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Category', {
              data: data,
              selectedId: item.name,
              item,
            })
          }>
          <View style={[styles.parentView]}>
            <SharedElement id={`item ${item.id} icon`}>
              <View style={styles.subView}>
                {data ? (
                  <Image url={item.imageUrl} />
                ) : (
                  <ActivityIndicator size="large" />
                )}
              </View>
            </SharedElement>
          </View>
          {/* <Title>{item.name}</Title> */}
          <TitleLight>{item.name}</TitleLight>
        </TouchableOpacity>
      )}
    />
  );
}
const styles = StyleSheet.create({
  parentView: {
    marginTop: cardHeight / 4,
    marginRight: cardWith / 4,
    justifyContent: 'space-around',
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    borderStyle: 'dashed',
    marginBottom: 5,
    borderColor: GRAY_DARK,
  },
  title: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    marginTop: 8,
    marginRight: 10,
    width: 120,
    color: 'white',
  },

  redColor: {
    color: 'red',
  },
  tinyLogo: {
    width: cardWith,
    height: cardHeight,
  },
  subView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    display: 'flex',
  },
  flatList: {
    overflow: 'hidden',
    width: '85%',
    display: 'flex',
    alignSelf: 'center',
  },
});
