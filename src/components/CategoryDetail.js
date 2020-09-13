import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Card from './Card';
import SvgBack, {default as Back} from './icons/Back';
import {SharedElement} from 'react-navigation-shared-element';
const cardWith = 50;
const cardHeight = 50;
const {width} = Dimensions.get('screen');
const spacingCard = 20;
const Spacing = 12;
export default function CategoryDetail({route, navigation: {goBack}}) {
  const {data, item} = route.params;

  const selectedItemindex = data.findIndex((i) => i.id === item.id);
  const ref = React.useRef();
  const [Value, setValue] = React.useState(selectedItemindex);
  const mountedAnimated = React.useRef(new Animated.Value(0)).current;
  const activeIndex = React.useRef(new Animated.Value(Value)).current;
  const animatedIndex = React.useRef(new Animated.Value(Value)).current;
  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 300,
      delay,
      useNativeDriver: true,
    });
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedIndex, {
        toValue: activeIndex,
        duration: 500,
        useNativeDriver: true,
      }),
      animation(1, 500),
    ]).start();
  });
  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });
  const size = cardWith * 2;
  const translateX = activeIndex.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size],
  });
  return (
    <View style={{flex: 1}}>
      <SvgBack onPress={() => goBack()} />
      <Animated.FlatList
        style={[
          styles.flatList,
          {
            marginLeft: width / 2 - cardWith / 2 - Spacing,
            transform: [{translateX}],
          },
        ]}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        snapToAlignment="start"
        snapToInterval={cardWith + Spacing}
        renderItem={({item, index}) => {
          const inputRange = [index - 1, index, index + 1];
          const opacity = activeIndex.interpolate({
            inputRange,
            outputRange: [0.1, 1, 0.1],
            extrapolate: 'clamp',
          });
          return (
            <TouchableOpacity
              style={{padding: Spacing}}
              key={item.id}
              onPress={() => {
                activeIndex.setValue(index);
                setValue(index);
                ref.current.scrollToIndex({
                  index,
                  animated: true,
                });
              }}>
              <SharedElement id={`item ${item.id} icon`}>
                <Animated.View style={[styles.subView, {opacity}]}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: item.imageUrl,
                    }}
                  />
                </Animated.View>
              </SharedElement>
              <Text
                style={[
                  styles.title,
                  ,
                  item.id === activeIndex && styles.redColor,
                ]}>
                {item.name}
              </Text>
              <Text style={styles.subTitle}>{item.count}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.Info}>
        <Animated.FlatList
          style={{opacity: mountedAnimated, transform: [{translateY}]}}
          ref={ref}
          data={data}
          keyExtractor={(item) => item.id}
          horizontal
          initialScrollIndex={selectedItemindex}
          nestedScrollEnabled
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onMomentumScrollEnd={(ev) => {
            const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
            activeIndex.setValue(newIndex);
          }}
          renderItem={({item}) => {
            return (
              <ScrollView
                style={{
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  borderRadius: 16,
                  width: width - spacingCard * 2,
                  margin: spacingCard,
                }}>
                <View style={{padding: spacingCard}}>
                  <Text style={{fontSize: 16}}>
                    {Array(50).fill('Dummy data örnek \n')}
                  </Text>
                </View>
              </ScrollView>
            );
          }}></Animated.FlatList>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  parentView: {
    justifyContent: 'flex-end',
  },
  Info: {
    flex: 5,
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
  redColor: {
    color: 'red',
  },
  tinyLogo: {
    width: cardWith,
    height: cardHeight,
    borderRadius: 50,
  },
  subView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
  },
  flatList: {
    flex: 1,
    overflow: 'hidden',
    marginTop: 12,
    width: '200%',
  },
});
