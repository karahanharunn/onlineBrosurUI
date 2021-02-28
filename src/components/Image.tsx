import React from 'react';
import {View, FlatList, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Image from './image/Image';
import LoveButton from './love/LoveButton';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Item = ({item, index, navigation}) => (
  <View
    key={item.brandName}
    style={{
      borderColor: '#EFEFF0',
      borderWidth: 1,
      margin: 11,
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}>
      <TextComponent style={{color: 'green'}}>{item.brandName}</TextComponent>
      <TextComponent>{item.totalPage} Sayfa</TextComponent>
    </View>
    <View style={{paddingHorizontal: 10, paddingBottom: 5}}>
      <TextComponent index={index}>{item?.name} </TextComponent>
    </View>
  </View>
);
interface TextComponentProps {
  index?: any;
  children?: React.ReactNode;
}
const TextComponent = ({index, children, ...rest}: TextComponentProps) => (
  <Text
    style={{
      fontSize: 12,
      color: index / 2 === 0 ? '#F4A325' : '#9B8ACA',
    }}
    {...rest}>
    {children}
  </Text>
);
export default function ImageComponent({data, navigation, ...rest}) {
  const renderItem = ({item}) => {
    return (
      <View style={{width: windowWidth / 2}}>
        <Item item={item} navigation={navigation} />
      </View>
    );
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
  end: {fontSize: 12, color: '#C1C0C3'},
  start: {
    fontSize: 16,
    lineHeight: 20,
    color: '#333333',
    fontFamily: 'Montserrat-Medium',
  },
});
