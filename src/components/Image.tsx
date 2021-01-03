import React from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Image from './image/Image';
import LoveButton from './love/LoveButton';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Item = ({ item, index, navigation }) => (
  <View
    key={item.brandName}
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
          selectedId: item.brandName,
          item,
        })
      }>
      <Image
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        url={item.coverImageUrl}
      />
    </TouchableOpacity>
    <View
      style={{
        height: 60,
        marginHorizontal: 12,
        marginTop: 9,
        paddingTop: 6,
        borderTopWidth: 1,
        borderColor: '#EFEFF0',
        display: 'flex',
        justifyContent: 'space-evenly',
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
            paddingHorizontal: 6,
            height: 22,
            borderRadius: 10,
            opacity: index / 2 === 0 ? 0.5 : 0.8,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <TextComponent style={{ color: 'green' }}>
            {item.brandName}
          </TextComponent>
        </View>
        <TextComponent>{item.totalPage} Sayfa</TextComponent>
      </View>
      <TextComponent index>{item?.name} </TextComponent>
    </View>
  </View>
);
const TextComponent = ({ index, children, ...rest }: { index: Number | undefined, children?: React.ReactNode }) => (
  <Text
    style={{
      fontSize: 12,
      color: index / 2 === 0 ? '#F4A325' : '#9B8ACA',
    }}
    {...rest}>
    {children}
  </Text>
);
export default function ImageComponent({ data, navigation, ...rest }) {
  const renderItem = ({ item }) => {
    return <Item item={item} navigation={navigation} />;
  };

  return (
    <FlatList
      {...rest}
      data={data}
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyExtractor={(item) => item.brandName}
      renderItem={renderItem}
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
    position: 'relative',
  },

  subTitle: {
    fontSize: 12,
    color: '#C1C0C3',
  },
  end: { fontSize: 12, color: '#C1C0C3' },
  start: {
    fontSize: 16,
    lineHeight: 20,
    color: '#333333',
    fontFamily: 'Montserrat-Medium',
  },
});
