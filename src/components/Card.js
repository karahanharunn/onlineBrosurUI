import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import SvgDelete from './icons/Delete';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SharedElement} from 'react-navigation-shared-element';
import {GRAY_DARK} from '../styles/colors';
import {AppService} from '../services/AppService';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cardWith = 40;
const cardHeight = 40;
const Spacing = 6;
const data = [
  {
    name: 'Fast Food',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Logo_of_B%C4%B0M.PNG',
    count: '136 Places',
    id: 1,
  },
  {
    name: 'Fast Food2',
    imageUrl:
      'https://i.pinimg.com/originals/f2/de/b3/f2deb32dc6cd0bcc8eb417f97e4b2540.png',
    count: '256 Places',
    id: 2,
  },
  {
    name: 'Fast Food3',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Logo_of_B%C4%B0M.PNG',
    count: '10 Places',
    id: 3,
  },
  {
    name: 'Fast Food4',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Logo_of_B%C4%B0M.PNG',
    count: '248 Places',
    id: 4,
  },
  {
    name: 'Fast Food5',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Logo_of_B%C4%B0M.PNG',
    count: '248 Places',
    id: 5,
  },
  {
    name: 'Fast Food6',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Logo_of_B%C4%B0M.PNG',
    count: '248 Places',
    id: 6,
  },
  {
    name: 'Fast Food7',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Logo_of_B%C4%B0M.PNG',
    count: '248 Places',
    id: 7,
  },
  {
    name: 'Fast Food8',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Logo_of_B%C4%B0M.PNG',
    count: '248 Places',
    id: 8,
  },
  {
    name: 'Fast Food9',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/3/30/Logo_of_B%C4%B0M.PNG',
    count: '248 Places',
    id: 9,
  },
];
export default function Card({navigation, selectedId, isMaster}) {
  // const [data, setData] = useState();
  // useEffect(() => {
  //   (() => {
  //     AppService.getBrands().then((response) => {
  //       setData(response.data);
  //       debugger;
  //     });
  //   })();
  // }, []);
  // console.log(data);
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      snapToAlignment="start"
      snapToInterval={cardWith + Spacing}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Category', {
              data: data,
              selectedId: item.id,
              item,
            })
          }>
          <View style={[styles.parentView]}>
            <SharedElement id={`item ${item.id} icon`}>
              <View style={styles.subView}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: item.imageUrl,
                  }}
                  resizeMode={'contain'}
                />
              </View>
            </SharedElement>
          </View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subTitle}>{item.count}</Text>
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
    borderColor: GRAY_DARK,
  },
  title: {
    fontSize: 11,
    marginTop: 5,
    fontFamily: 'OpenSans-SemiBold',
    color: '#222831',
  },
  subTitle: {
    color: 'gray',
    fontSize: 12,
    alignItems: 'flex-start',
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
