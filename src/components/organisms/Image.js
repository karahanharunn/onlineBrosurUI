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
      numColumns={2}
      data={data}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyExtractor={(item) => item.brandName}
      renderItem={({item, index}) => (
        <View
          style={{
            borderColor: '#EFEFF0',
            borderWidth: 1,
            marginVertical: 11,
            marginHorizontal: 11,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Brand', {
                data: data,
                selectedId: item.brandName,
                item,
              })
            }>
            <Image
              style={{
                width: windowWidth / 3,
                height: '100%',
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                paddingBottom: 18,
              }}
              url={item.thumbCoverImageUrl}
            />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'white',
              height: 60,
              marginHorizontal: 18,
              marginTop: 18,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'space-between',
              }}>
              <View
                style={{
                  minWidth: 70,
                  padding:6,
                  height: 22,
                  borderRadius: 10,
                  backgroundColor: index / 2 === 0 ? '#DDD6F7' : '#FCC064',
                  opacity: index / 2 === 0 ? 0.5 : 0.8,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: index / 2 === 0 ? '#9B8ACA' : '#F4A325',
                    opacity: 1,
                  }}>
                  {item.brandName}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: index / 2 === 0 ? '#F4A325' : '#9B8ACA',
                }}>
                {item.details.length} Sayfa
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: index / 2 === 0 ? '#F4A325' : '#9B8ACA',
                marginTop: 12,
              }}>
              {item.dateMessage || 'Date Message'}
            </Text>
          </View>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  button: {
    height: 220,
    width: (windowWidth - 60) / 2,
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
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
});
